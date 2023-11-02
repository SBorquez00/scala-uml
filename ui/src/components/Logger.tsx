import { Panel, useReactFlow } from "reactflow";
import Button from "./Button";

export default function Logger() {
  const { getEdges } = useReactFlow();
  const clickHandler = () => {
    const edges = getEdges();
    const nodes = edges.map(
      (edge) => {
        return {
          source: edge.source,
          target: edge.target
        }
      }
    );
    console.log(nodes);
  };
  return (
    <Panel position="bottom-right">
      <Button onClick={clickHandler}>Log</Button>
    </Panel>
  );
}
