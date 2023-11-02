import { useEffect, useState } from "react";
import axios from "axios";
import BoxFlow, { NodesType } from "./components/BoxFlow";
import FormCreateNode from "./components/FormCreateNode";
import Button from "./components/Button";
import { useReactFlow } from "reactflow";

const className = "Persona";
const methods = [
  "get_species()",
  "get_nombre()",
  "get_apellido()",
  "get_numero_de_cuenta()",
];

export default function App() {
  const [post, _] = useState("");
  const [stringPost, setStringPost] = useState("hola");
  const baseURL = "http://localhost:8080/uml";
  const [createNewNode, setCreateNewNode] = useState<Function>(() => () => {});
  const [nodesList, setNodesList] = useState<NodesType[]>([]);
  const { getEdges, getNode } = useReactFlow()

  const createPost = () => {
    if (nodesList.length === 0) {
      console.log("no hay nodos");
      return;
    }
    let data = nodesList.map((node) => {
      return {
        id: node.id,
        className: node.data.name ? node.data.name : "hola",
        classType: node.data.classType,
        methods: node.data.methods,
        target: "-1"
      };
    });
    const data2: {
      [key: string]: { [k: string]: string | string[] | undefined };
    } = data.reduce(
      (
        acc: { [key: string]: { [k: string]: string | string[] | undefined } },
        node
      ) => {
        const { id, ...newNode } = node;
        acc[id] = newNode;
        return acc;
      },
      {}
    );
    const edges = getEdges().map((edge) => {
      return {
        source: edge.source,
        target: edge.target,
      };
    });

    edges.forEach((edge) => {
      data2[edge.source].target = getNode(edge.target)?.data.name;
    })
    const data3 = Object.values(data2);
    axios.post(baseURL, data3).then((response) => {
      const res: string = response.data;
      setStringPost(res);
      console.log(stringPost);
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
    <div className="px-1 mx-auto xl:container">
      <header className="bg-slate-300 p-1">
        <h1 className="text-3xl text-cyan-950 text-center font-bold underline">
          Uml to Scala Converter
        </h1>
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
      <div className="flex h-screen pb-10">
        <div className="flex-initial w-3/4 h-full border border-red-700 relative top-1">
          <BoxFlow
            name={className}
            methods={methods}
            setter={handlerCreateNewNode}
            nodeState={[nodesList, setNodesList]}
          />
        </div>
        <div className="flex-initial w-1/4 relative top-1 ml-1">
          <textarea
            className="border border-red-700 w-full h-full"
            value={stringPost}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}
