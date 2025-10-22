import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { Item, Pair, CorrectPair } from "../types/types";

export const useDragAndDrop = (
  leftItems: Item[],
  rightItems: Item[],
  correctPairs: CorrectPair[]
) => {
  const [draggingItem, setDraggingItem] = useState<Item | null>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [pairs, setPairs] = useState<Pair[]>([]);

  const leftRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const rightRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  useEffect(() => {
    const saved = localStorage.getItem("pairs");
    if (saved) {
      try {
        setPairs(JSON.parse(saved));
      } catch {
        localStorage.removeItem("pairs");
      }
    }
  }, []);

  const resetDrag = () => {
    setDraggingItem(null);
    setHoverItem(null);
  };

  const handleDragStart = useCallback((item: Item, e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", item.id);
    setDraggingItem(item);

    const crt = document.createElement("div");
    crt.style.width = "0px";
    crt.style.height = "0px";
    e.dataTransfer.setDragImage(crt, 0, 0);
  }, []);

  const handleDrop = useCallback(
    (target: Item) => {
      if (!draggingItem || draggingItem.id === target.id) return;

      const isLeftToRight =
        leftItems.some((i) => i.id === draggingItem.id) &&
        rightItems.some((i) => i.id === target.id);

      const isRightToLeft =
        rightItems.some((i) => i.id === draggingItem.id) &&
        leftItems.some((i) => i.id === target.id);

      if (!isLeftToRight && !isRightToLeft) {
        toast.error("Можно соединять только противоположные колонки!");
        resetDrag();
        return;
      }

      const leftId = isLeftToRight ? draggingItem.id : target.id;
      const rightId = isLeftToRight ? target.id : draggingItem.id;

      const leftOccupied = pairs.some(
        (p) => p.left === (isLeftToRight ? draggingItem.text : target.text)
      );
      const rightOccupied = pairs.some(
        (p) => p.right === (isLeftToRight ? target.text : draggingItem.text)
      );

      if (leftOccupied || rightOccupied) {
        toast.error("Эта карта уже занята!");
        resetDrag();
        return;
      }

      const isCorrect = correctPairs.some(
        (pair) => pair.leftId === leftId && pair.rightId === rightId
      );

      const newPair: Pair = {
        id: `${draggingItem.id}-${target.id}`,
        left: isLeftToRight ? draggingItem.text : target.text,
        right: isLeftToRight ? target.text : draggingItem.text,
        isCorrect,
      };

      setPairs((prev) => [...prev, newPair]);
      resetDrag();
    },
    [draggingItem, pairs, correctPairs, leftItems, rightItems, resetDrag]
  );

  const removePair = useCallback((id: string) => {
    setPairs((prev) => prev.filter((p) => p.id !== id));
    toast.success("Пара удалена!");
  }, []);

  const saveToLocalStorage = () => {
    if (pairs.length == 0) {
      toast.error("Нет сохранённых данных");
      return;
    }
    localStorage.setItem("pairs", JSON.stringify(pairs));
    toast.success("Соединения сохранены!");
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem("pairs");
    if (!saved) {
      toast.error("Нет сохранённых данных");
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        toast.error("Нет сохранённых данных");
        return;
      }
      setPairs(parsed);
      toast.success("Соединения восстановлены!");
    } catch {
      toast.error("Ошибка загрузки данных");
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("pairs");
    setPairs([]);
    toast.success("Данные очищены!");
  };

  const clearPairs = () => {
    setPairs([]);
    toast.success("Данные сброшены!");
  };

  return {
    draggingItem,
    hoverItem,
    mousePosition,
    pairs,
    leftRefs,
    rightRefs,
    setHoverItem,
    setMousePosition,
    handleDragStart,
    handleDrop,
    resetDrag,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
    clearPairs,
    removePair,
  };
};
