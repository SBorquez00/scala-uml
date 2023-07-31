import { useState } from "react";
import axios from "axios";
import BoxFlow, { NodesType } from "./components/BoxFlow";
import FormCreateNode from "./components/FormCreateNode";
import Button from "./components/Button";

const className = "Persona";
const methods = ["get_nombre()", "get_apellido()", "get_numero_de_cuenta()"];

export default function App() {
  const [post, setPost] = useState("");
  const baseURL = "http://localhost:8000/uml";
  const [createNewNode, setCreateNewNode] = useState<Function>(() => () => {});
  const [nodesList, setNodesList] = useState<NodesType[]>([]);

  const createPost = () => {
    let data = nodesList.map((node) => {
      return {
        className: node.data.name ? node.data.name : "hola",
        methods: node.data.methods,
      };
    });
    axios.post(baseURL, data, { responseType: "blob" }).then((response) => {
      setPost(window.URL.createObjectURL(new Blob([response.data])));
    });
  };
  //write a function that receive a function and set the state
  const handlerCreateNewNode = (createFunction: Function) => {
    setCreateNewNode(() => createFunction);
  };

  return (
    <div className="w-100 h-100">
      <h1 className="text-3xl text-red-500 text-center font-bold underline">
        Hello world!
      </h1>
      <Button onClick={() => createPost()}>Create Scala Code</Button>
      <FormCreateNode createFunction={createNewNode} />
      {post != "" ? (
        <a href={post} download={"output.zip"} className="border ml-3 text-xl border-blue-500 rounded p-2">
          Descarga aquí
        </a>
      ) : (
        <div></div>
      )}
      <div className="w-screen h-screen">
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
