export type Achievement = {
  id: string;
  title: string;
  description: string;
};

export type Question = {
    a: number;
    b: number;
    answer: number;
};

export type Difficulty =  "easy"| "normal" | "hard";
