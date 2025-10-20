export interface Item {
  id: string;
  text: string;
}

export interface Pair {
  left: string;
  right: string;
  id: string;
  isCorrect: boolean;
}

export interface CorrectPair {
  leftId: string;
  rightId: string;
}
