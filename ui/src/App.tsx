import { useEffect, useState } from "react";
import axios from "axios";
import BoxFlow, { NodesType } from "./components/BoxFlow";
import FormCreateNode from "./components/FormCreateNode";
import Button from "./components/Button";

const className = "Persona";
const methods = [
  "get_species()",
  "get_nombre()",
  "get_apellido()",
  "get_numero_de_cuenta()",
];

export default function App() {
  const [post, setPost] = useState("");
  const baseURL = "http://localhost:8080/uml";
  const [createNewNode, setCreateNewNode] = useState<Function>(() => () => {});
  const [nodesList, setNodesList] = useState<NodesType[]>([]);

  const createPost = () => {
    if (nodesList.length === 0) {
      console.log("no hay nodos");
      return;
    }
    let data = nodesList.map((node) => {
      return {
        className: node.data.name ? node.data.name : "hola",
        methods: node.data.methods,
      };
    });
    console.log(data);
    axios.post(baseURL, data).then((response) => {
      console.log(response.data);
      //setPost(window.URL.createObjectURL(new Blob([response.data])));
    });
  };
  //write a function that receive a function and set the state
  const handlerCreateNewNode = (createFunction: Function) => {
    setCreateNewNode(() => createFunction);
  };

  useEffect(() => {
    document.title = "UML to Scala converter";
  }, []);

  return (
    <div className="w-screen h-screen">
      <header className="bg-slate-300 p-1">
        <h1 className="text-3xl text-cyan-950 text-center font-bold underline">Uml to Scala Converter</h1>
        <Button onClick={() => createPost()}>Create Scala Code</Button>
        <FormCreateNode createFunction={createNewNode} />
        {post != "" ? (
          <a
            href={post}
            download={"output.zip"}
            className="border ml-3 text-xl border-blue-500 rounded p-2"
          >
            Descarga aquí
          </a>
        ) : (
          <div></div>
        )}
      </header>

      <div className="w-11/12 h-full border border-red-700 relative left-[4%] top-1">
        <BoxFlow
          name={className}
          methods={methods}
          setter={handlerCreateNewNode}
          nodeState={[nodesList, setNodesList]}
        />
      </div>
    </div>
  );
}
