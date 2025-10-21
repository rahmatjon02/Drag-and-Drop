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
    {/* --- Отрисовка существующих линий --- */}
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
          >
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="0.6s"
              fill="freeze"
            />
          </PathLine>

          {/* Точка начала */}
          <LineDot
            cx={startX}
            cy={startY}
            r="4"
            $isCorrect={pair.isCorrect}
          />
          {/* Точка конца */}
          <LineDot
            cx={endX}
            cy={endY}
            r="4"
            $isCorrect={pair.isCorrect}
          />
        </g>
      );
    })}

    {/* --- Временная линия при перетаскивании --- */}
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

        const isFromLeft = !!leftRefs.current[draggingItem.id];

        const startX = isFromLeft
          ? rect.right - container.left
          : rect.left - container.left;
        const startY = rect.top + rect.height / 2 - container.top;
        const endX = mousePosition.x - container.left;
        const endY = mousePosition.y - container.top;

        return (
          <g>
            <DragLine d={`M ${startX} ${startY} L ${endX} ${endY}`} />
            {/* Точка на начале */}
            <circle cx={startX} cy={startY} r="4" fill="green" />
            {/* Точка на конце (движется за курсором) */}
            <circle cx={endX} cy={endY} r="4" fill="green" />
          </g>
        );
      })()}
  </SvgLayer>
);

export default memo(LineLayer);
