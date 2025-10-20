import { memo } from "react";
import type { Pair, Item } from "../types/types";
import { SvgLayer, PathLine, DragLine, LineDot } from "../styles/styles";

interface Props {
  pairs: Pair[];
  leftItems: Item[];
  rightItems: Item[];
  leftRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement }>;
  rightRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement }>;
  draggingItem: Item | null;
  mousePosition: { x: number; y: number };
}

const LineLayer = ({
  pairs,
  leftItems,
  rightItems,
  leftRefs,
  rightRefs,
  draggingItem,
  mousePosition,
}: Props) => (
  <SvgLayer>
    {pairs.map((pair) => {
      const left = leftItems.find((i) => i.text === pair.left);
      const right = rightItems.find((i) => i.text === pair.right);
      if (!left || !right) return null;

      const leftEl = leftRefs.current[left.id];
      const rightEl = rightRefs.current[right.id];
      if (!leftEl || !rightEl) return null;

      const lRect = leftEl.getBoundingClientRect();
      const rRect = rightEl.getBoundingClientRect();
      const container =
        leftEl.parentElement?.parentElement?.getBoundingClientRect();
      if (!container) return null;

      const startX = lRect.right - container.left;
      const startY = lRect.top + lRect.height / 2 - container.top;
      const endX = rRect.left - container.left;
      const endY = rRect.top + rRect.height / 2 - container.top;
      const cx = (startX + endX) / 2;

      return (
        <g key={pair.id}>
          <PathLine
            d={`M ${startX} ${startY} C ${cx} ${startY}, ${cx} ${endY}, ${endX} ${endY}`}
            $isCorrect={pair.isCorrect}
          />
          <LineDot cx={startX} cy={startY} r="4" $isCorrect={pair.isCorrect} />
          <LineDot cx={endX} cy={endY} r="4" $isCorrect={pair.isCorrect} />
        </g>
      );
    })}

    {draggingItem &&
      (() => {
        const el =
          leftRefs.current[draggingItem.id] ||
          rightRefs.current[draggingItem.id];
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const container =
          el.parentElement?.parentElement?.getBoundingClientRect();
        if (!container) return null;

        const startX = rect.right - container.left;
        const startY = rect.top + rect.height / 2 - container.top;
        const endX = mousePosition.x - container.left;
        const endY = mousePosition.y - container.top;
        console.log(mousePosition);

        return (
          <g>
            <DragLine d={`M ${startX} ${startY} L ${endX} ${endY}`} />
            <circle cx={startX} cy={startY} r="4" fill="red" />
          </g>
        );
      })()}
  </SvgLayer>
);

export default memo(LineLayer);
