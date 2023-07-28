import { useCallback, useMemo } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { Edge, Connection } from "@reactflow/core";
import NodeUml from "./node_uml";

interface BoxFlowProps {
  name: string;
  methods: string[];
}

interface NodesType {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: { label: string , nombre?: string, metodos?: string[]};
}
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
const nodeTypes = { umlNode: NodeUml }

export default function BoxFlow({name, methods}: BoxFlowProps) {
  const initialNodes:NodesType[] = useMemo(() => ([
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Hola" },
    },
    {
      id: "2",
      type: "umlNode",
      position: { x: 0, y: 100 },
      data: { label: "hola", name: name, methods: methods },
    },
  ]), []);
  //use the BackgroundProps to get the type of the variant
  const dotsvariant = BackgroundVariant.Dots;
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background variant={dotsvariant} gap={12} size={1} />
    </ReactFlow>
  );
}
