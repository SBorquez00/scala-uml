import { useCallback } from 'react'
/* import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'
import ReactFlow, { useNodesState, useEdgesState, addEdge, Background, BackgroundVariant } from 'reactflow'

import 'reactflow/dist/style.css';
import { Edge, Connection } from '@reactflow/core';

function App() {
  //const [count, setCount] = useState(0)

  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Hola' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'Mundo' } },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  //use the BackgroundProps to get the type of the variant
  const dotsvariant= BackgroundVariant.Dots;
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        
        <Background variant={dotsvariant} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

export default App
