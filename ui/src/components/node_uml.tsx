import { Handle, Position } from "reactflow";

function NodeUml() {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="border-solid rounded-none border border-gray-500	font-serif text-xs">
        <div className="border-solid rounded-none border-b border-gray-500 p-1 text-center">
          Persona
        </div>
        <div className="p-1">
          (+) get_nombre()<br/>
          (+) get_apellido() <br />
          (+) get_numero_de_cuenta() <br />

        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default NodeUml;
