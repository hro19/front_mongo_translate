import { atom, useAtomValue } from "jotai";
import { Task, CandidatesTask, JadgeTask, Gamen } from "../ts/Task";

// tasks一覧ページ
export const tasksStateAtom = atom<keyof typeof taskTab>("all");

// 単語テストページ
export const HOWManyLesson: number = 5; //問題数
export const HOWManySelect: number = 4; //問題時の選択肢の数
export const countdownTime = 4; //回答中の残り時間

export const failuresAtom = atom<CandidatesTask[]>([]);

export const gamenAtom = atom<Gamen>("default");
export const quizListCountAtom = atom<number>(0);
export const isJadgeAtom = atom<boolean | null>(null);

export const remainingTimeAtom = atom<number>(countdownTime);
export const isTimeZeroAtom = atom<boolean>(false);

//タブの切り替えのselect要素
const taskTab: Readonly<Record<string, string>> = {
  uncompleted: "勉強中",
  completed: "暗記済み",
  all: "全て",
};
export const taskTabAtom = atom(taskTab);

// tasksシングルページ
export const isSnakeAtom = atom<boolean>(false);
export const snakeDurationAtom = atom<number>(2000);
export const checkEditAtom = atom<boolean>(false);


export const nameAtom = atom<string>("");
export const jaNameAtom = atom<string>("");
export const speechAtom = atom<string>("");
export const completedAtom = atom<boolean>(false);

export const taskAtom = atom<Task>({
  _id: "",
  completed: false,
  name: "",
  jaName: "",
  speech: "",
});

// 品詞の設定
const initialSpeechOptions: Readonly<Record<string, string>> = {
  verb: "動詞",
  idiom: "熟語",
  adjective: "形容詞",
  adverb: "副詞",
  noun: "名詞",
  auxiliaryVerb: "助動詞",
  gerund: "動名詞",
};
export const initialSpeechOptionsAtom = atom(initialSpeechOptions);

//品詞のkeyから日本語の文字
export const getSpeechLabel = (speech: keyof typeof initialSpeechOptions) => {
  return initialSpeechOptions[speech] || "";
};