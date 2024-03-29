import { atom, useAtomValue } from "jotai";
import { Task } from "../ts/Task";

// tasks一覧ページ
export const tasksStateAtom = atom<keyof typeof taskTab>("uncompleted");

//タブの切り替えのselect要素
const taskTab = {
  uncompleted: "勉強中",
  completed: "暗記済み",
  all: "全て",
} as const satisfies Record<string, unknown>;
export const taskTabAtom = atom(taskTab);

export const filteredTasksAtom = atom<Task[]>([]);

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
const initialSpeechOptions = {
  verb: "動詞",
  idiom: "熟語",
  adjective: "形容詞",
  adverb: "副詞",
  noun: "名詞",
  auxiliaryVerb: "助動詞",
  gerund: "動名詞",
  all: "全て",
} as const satisfies Record<string, unknown>;
export const initialSpeechOptionsAtom = atom(initialSpeechOptions);

//現在選択されている品詞
export const initialSpeechStateAtom = atom<keyof typeof initialSpeechOptions>("all");

//品詞のkeyから日本語の文字
export const getSpeechLabel = (speech: keyof typeof initialSpeechOptions) => {
  return initialSpeechOptions[speech];
};

