import { Handle, Position, Node, NodeProps } from "reactflow";

interface NodeUmlProps {
  name: String;
  methods: String[];
  classType: String;
}

function NodeUml({ data }: NodeProps<NodeUmlProps>) {
  const className = data.name ? data.name : "Class";
  return (
    <>
      <Handle type="source" position={Position.Top} />
      <div className="border-solid font-mono rounded-none border border-gray-500 bg-white	text-xs">
        <div className="border-solid rounded-none border-b border-gray-500 p-1 text-center">
          {data.classType === "trait" ? (
            <div className="text-center">
            <span>{"<<trait>>"}</span><br></br> {className}
            </div>
          ) : data.classType === "abstractClass" ? (
            <span className="italic">{className}</span>
          ) : (
            className
          )}
        </div>
        <div className="p-1">
          {data.methods?.map((method, index) => (
            <div key={index}>{method}</div>
          ))}
        </div>
      </div>
      <Handle type="target" position={Position.Bottom} />
    </>
  );
}

export default NodeUml;
