import { memo } from "react";
import type { Item, Pair } from "../types/types";
import ItemCard from "./ItemCard";
import { ColumnWrapper } from "../styles/styles";

interface Props {
  items: Item[];
  hoverItem: string | null;
  onDragStart: (item: Item, e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrop: (item: Item) => void;
  onDragEnter: (id: string) => void;
  onDragLeave: () => void;
  refs: React.MutableRefObject<{ [key: string]: HTMLDivElement }>;
  pairs: Pair[];
}

const Column = ({
  items,
  hoverItem,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragEnter,
  onDragLeave,
  refs,
  pairs,
}: Props) => (
  <ColumnWrapper>
    {items.map((item) => (
      <ItemCard
        key={item.id}
        item={item}
        hoverItem={hoverItem}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        refEl={(el) => {
          if (el) refs.current[item.id] = el;
        }}
        pairs={pairs}
      />
    ))}
  </ColumnWrapper>
);

export default memo(Column);
