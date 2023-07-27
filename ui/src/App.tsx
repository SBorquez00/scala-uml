import { useCallback, useMemo } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, BackgroundVariant } from 'reactflow'

import 'reactflow/dist/style.css';
import { Edge, Connection } from '@reactflow/core';

import NodeUml from './components/node_uml'

function App() {
  //const [count, setCount] = useState(0)

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Hola' } },
    { id: '2', type: 'umlNode',position: { x: 0, y: 100 }, data: { label: 'Mundo' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ umlNode: NodeUml }), []);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  //use the BackgroundProps to get the type of the variant
  const dotsvariant= BackgroundVariant.Dots;
  return (
    <div className="w-100 h-100">
      <h1 className="text-3xl text-red-500 text-center font-bold underline">
       Hello world!
      </h1>
      <div className="w-screen h-screen">
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
      </div>
    </div>
  )
}

export default App
