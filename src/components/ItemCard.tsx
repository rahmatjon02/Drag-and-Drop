import { memo } from "react";
import type { Item, Pair } from "../types/types";
import { ItemWrapper } from "../styles/styles";

interface Props {
  item: Item;
  hoverItem: string | null;
  onDragStart: (item: Item, e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDrop: (item: Item) => void;
  onDragEnter: (id: string) => void;
  onDragLeave: () => void;
  refEl: (el: HTMLDivElement | null) => void;
  pairs?: Pair[];
  draggingItem: Item | null;
}

const ItemCard = ({
  item,
  hoverItem,
  onDragStart,
  onDragEnd,
  onDrop,
  onDragEnter,
  onDragLeave,
  refEl,
  pairs = [],
  draggingItem,
}: Props) => {
  const pair = pairs.find((p) => p.left === item.text || p.right === item.text);
  const isCorrect = pair ? pair.isCorrect : null;

  return (
    <ItemWrapper
      draggable
      $isHover={hoverItem === item.id}
      $isCorrect={isCorrect}
      onDragStart={(e) => onDragStart(item, e)}
      onDragEnd={onDragEnd}
      onDrop={() => onDrop(item)}
      onDragEnter={() => onDragEnter(item.id)}
      onDragLeave={onDragLeave}
      ref={refEl}
      $isDragging={draggingItem?.id === item.id}
    >
      {item.text}
    </ItemWrapper>
  );
};

export default memo(ItemCard);
