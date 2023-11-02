import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";

interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  type: string;
  top?: number | boolean;
  left?: number | boolean;
  right?: number | boolean;
  bottom?: number | boolean;
}

export default function ContextMenu({
  id,
  type,
  top,
  left,
  right,
  bottom,
  ...props
}: ContextMenuProps) {
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);
  top = typeof top === "boolean" ? 0 : top;
  left = typeof left === "boolean" ? 0 : left;
  right = typeof right === "boolean" ? 0 : right;
  bottom = typeof bottom === "boolean" ? 0 : bottom;

  return (
    <div
      style={{ top, left, right, bottom }}
      className="bg-white border shadow absolute z-10 h-fit w-fit"
      {...props}
    >
      <p style={{ margin: "0.5em" }} className="text-xl">
        <small>node: {id}</small>
        <br></br>
        <small>tipo: {type}</small>
      </p>
      <button
        onClick={deleteNode}
        className="border-t-2 border-black block p-2 text-left w-full text-2xl hover:bg-stone-300"
      >
        Borrar
      </button>
    </div>
  );
}
