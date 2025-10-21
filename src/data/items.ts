import type { CorrectPair, Item } from "../types/types";

export const leftItems: Item[] = [
  { id: "left-1", text: "React" },
  { id: "left-2", text: "TypeScript" },
  { id: "left-3", text: "Tailwind CSS" },
  { id: "left-4", text: "Vite" },
  { id: "left-5", text: "JavaScript" },
];

export const rightItems: Item[] = [
  { id: "right-5", text: "Prog. Language" },
  { id: "right-2", text: "Type Safety" },
  { id: "right-4", text: "Build Tool" },
  { id: "right-3", text: "CSS Framework" },
  { id: "right-1", text: "UI Library" },
];

export const correctPairs: CorrectPair[] = [
  { leftId: "left-1", rightId: "right-1" },
  { leftId: "left-2", rightId: "right-2" },
  { leftId: "left-3", rightId: "right-3" },
  { leftId: "left-4", rightId: "right-4" },
  { leftId: "left-5", rightId: "right-5" },
];
