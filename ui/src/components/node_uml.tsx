import { Handle, Position, Node, NodeProps } from "reactflow";

interface NodeUmlProps {
  name: String;
  methods: String[];
}
  

function NodeUml({ data }: NodeProps<NodeUmlProps>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="border-solid rounded-none border border-gray-500	font-serif text-xs">
        <div className="border-solid rounded-none border-b border-gray-500 p-1 text-center">
          {data.name? data.name : "Class"}
        </div>
        <div className="p-1">
          {data.methods?.map((method, index) => (
            <div key={index}>{method}</div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default NodeUml;
