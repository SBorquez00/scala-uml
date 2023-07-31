import { useCallback, useMemo, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  DefaultEdgeOptions,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Edge, Connection } from "@reactflow/core";
import NodeUml from "./node_uml";

interface BoxFlowProps {
  name: string;
  methods: string[];
  setter: Function;
  nodeState: [NodesType[], Function];
}

export interface NodesType {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: { label: string; name?: string; methods?: string[] };
}
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
];
const defaultEdgeOptions: DefaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: "#000000" },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#000000",
  },
  type: "smoothstep",
};

const nodeTypes = { umlNode: NodeUml };

export default function BoxFlow({
  name,
  methods,
  setter,
  nodeState,
}: BoxFlowProps) {
  const [nodeList, setNodesList] = nodeState;
  const initialNodes: NodesType[] = useMemo(
    () => [
      {
        id: "1",
        type: "umlNode",
        position: { x: 0, y: 0 },
        data: { label: "Hola", name: "Entidad", methods: ["get_species()"] },
      },
      {
        id: "2",
        type: "umlNode",
        position: { x: 10, y: 100 },
        data: { label: "hola", name: name, methods: methods },
      },
    ],
    []
  );

  //use the BackgroundProps to get the type of the variant
  const dotsvariant = BackgroundVariant.Dots;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [n_id, setId] = useState(3);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const createNewNode = (name: string, methods: string[]) => {
    const newNode: NodesType = {
      id: n_id.toString(),
      type: "umlNode",
      position: { x: 50 * (n_id - 2), y: 50 },
      data: { label: "hola", name: name, methods: methods },
    };
    setId((id) => id + 1);
    setNodes((nodes) => [...nodes, newNode]);
    setNodesList([...nodeList, newNode]);
  };

  useEffect(() => {
    setter(createNewNode);
  }, [nodes]);

  useEffect(() => {
    setNodesList(initialNodes);
  }, []);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background variant={dotsvariant} gap={12} size={1} />
        <MiniMap position={"top-right"} />
        <Controls position={"top-left"} />
      </ReactFlow>
    </>
  );
}
