import {
  BaseEdge,
  EdgeProps,
  MarkerType,
  getMarkerEnd,
  getSmoothStepPath,
  useReactFlow,
} from "reactflow";

import ArrowHead from "./ArrowHead";

export default function ImplementEdge({
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { getNode } = useReactFlow();
  const typeClass = getNode(target)?.data.classType;
  const styleImplement = { strokeWidth: 1, stroke: "#000000", strokeDasharray: "4, 4" }
  const styleExtend = { strokeWidth: 1, stroke: "#000000" }
  const markerEndCustom = getMarkerEnd(MarkerType.Arrow, "arrow")

  return (
    <>
      <ArrowHead/>
      {typeClass === "trait" ? (
        <BaseEdge path={path} markerEnd={markerEndCustom} style={styleImplement} />
      ) : (
        <BaseEdge path={path} markerEnd={markerEndCustom} style={styleExtend} />
        )}
    </>
  );
}
