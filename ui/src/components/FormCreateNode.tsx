import { useState } from "react";
import Button from "./Button";

interface FormCreateNodeProps {
  createFunction: any;
}

export default function FormCreateNode(props: FormCreateNodeProps) {
  const [name, setName] = useState("");

  return (
    <>
      <label>Ingrese nombre de clase</label>
      <input
        value={name}
        type="text"
        className="border border-black"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <Button
        onClick={() => {
          props.createFunction(name);
        }}
      >
        Create New Node
      </Button>
    </>
  );
}
