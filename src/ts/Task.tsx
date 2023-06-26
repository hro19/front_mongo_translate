export type Task = {
  _id: string;
  jaName: string;
  name: string;
  speech: string;
  completed: boolean;
};

//問題に対する選択肢のテキストを含んでいる
export type CandidatesTask = Task & {
  candidates: JadgeTask[];
};

//問題に対する選択肢のテキストの中に正解か不正解かを含んでいる
export type JadgeTask = Task & {
  correct: boolean;
};

export type Gamen = "default" | "question" | "answer" | "finish";