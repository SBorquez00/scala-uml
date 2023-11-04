import { useCallback, useMemo, useEffect, useState, useRef } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  BackgroundVariant,
  MiniMap,
  Controls,
  DefaultEdgeOptions,
  NodeMouseHandler,
  Node,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Edge, Connection } from "@reactflow/core";
import NodeUml from "./node_uml";
import ContextMenu from "./ContextMenu";
import ImplementEdge from "./ImplementEdge";

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
  data: { label: string; name?: string; methods?: string[]; classType: string };
}

interface MenuProps {
  id: string;
  type: string;
  top: number | boolean;
  left: number | boolean;
  right: number | boolean;
  bottom: number | boolean;
}

const initialEdges = [
  { id: "e1-2", source: "2", target: "1", type: "implementedge" },
];

const edgeTypes = {
  implementedge: ImplementEdge,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: "implementedge",
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
        data: {
          label: "Hola",
          name: "Entidad",
          methods: ["get_species()"],
          classType: "class",
        },
      },
      {
        id: "2",
        type: "umlNode",
        position: { x: 10, y: 100 },
        data: {
          label: "hola",
          name: name,
          methods: methods,
          classType: "class",
        },
      },
    ],
    []
  );

  //use the BackgroundProps to get the type of the variant
  const dotsvariant = BackgroundVariant.Dots;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [n_id, setId] = useState(3);
  const [menu, setMenu] = useState<MenuProps | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const edgeUpdateSuccessful = useRef(true);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const createNewNode = (
    name: string,
    methods: string[],
    classType: string
  ) => {
    const newNode: NodesType = {
      id: n_id.toString(),
      type: "umlNode",
      position: { x: 50 * (n_id - 2), y: 50 },
      data: {
        label: "hola",
        name: name,
        methods: methods,
        classType: classType,
      },
    };
    setId((id) => id + 1);
    setNodes((nodes) => [...nodes, newNode]);
    setNodesList([...nodeList, newNode]);
  };

  const onNodeContextMenu: NodeMouseHandler = useCallback(
    (
      event: React.MouseEvent<Element, MouseEvent>,
      node: Node<any, string | undefined>
    ) => {
      // Prevent native context menu from showing
      event.preventDefault();

      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current?.getBoundingClientRect();
      if (pane !== undefined) {
        setMenu({
          id: node.id,
          type: node.data.classType ? node.data.classType : "class",
          top: event.clientY < pane.height - 200 && event.clientY,
          left: event.clientX < pane.width - 200 && event.clientX,
          right:
            event.clientX >= pane.width - 200 && pane.width - event.clientX,
          bottom:
            event.clientY >= pane.height - 200 && pane.height - event.clientY,
        });
      }
    },
    [setMenu]
  );
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  useEffect(() => {
    setter(createNewNode);
  }, [nodes]);

  useEffect(() => {
    setNodesList(nodes);
  }, [nodes]);

  return (
    <>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Background variant={dotsvariant} gap={12} size={1} />
        <MiniMap position={"top-right"} />
        <Controls position={"top-left"} />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlow>
    </>
  );
}
