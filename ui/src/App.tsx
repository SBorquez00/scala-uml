import { useState } from "react";
import axios from "axios";
import BoxFlow from "./components/BoxFlow";

const className = "Persona";
const methods = ["get_nombre()", "get_apellido()", "get_numero_de_cuenta()"];

export default function App() {
  const [post, setPost] = useState("");
  const baseURL = "http://localhost:8000/uml";

  const createPost = (class_name: String, methods: String[]) => {
    axios
      .post(baseURL, {
        className: class_name,
        methods: methods,
      }, {responseType: 'blob'})
      .then((response) => {
        setPost(window.URL.createObjectURL(new  Blob([response.data])));
      });
  };

  return (
    <div className="w-100 h-100">
      <h1 className="text-3xl text-red-500 text-center font-bold underline">
        Hello world!
      </h1>
      <button
        className="border-red-500 border-2 p-1 rounded shadow-md ml-1 bg-slate-50 hover:bg-slate-400/75 text-xl"
        onClick={() => createPost(className, methods)}
      >
        Create Post
      </button>
      {post != "" ? (<a href={post} download={"file.txt"}>Descarga aquí</a>) : (<div></div>)}
      <div className="w-screen h-screen">
        <BoxFlow name={className} methods={methods} />
      </div>
    </div>
  );
}
