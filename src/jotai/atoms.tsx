import { atom, useAtomValue } from "jotai";
import { SelectSwitch, Task } from "../ts/Task";

// tasks一覧ページ
export const tasksStateAtom = atom<SelectSwitch>("all");

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
const initialSpeechOptions: Record<string, string> = {
  verb: "動詞",
  phrasalVerb: "句動詞",
  adjective: "形容詞",
  adverb: "副詞",
  noun: "名詞",
  auxiliaryVerb: "助動詞",
  gerund: "動名詞",
};

export const initialSpeechOptionsAtom = atom(initialSpeechOptions);

export const getSpeechLabel = (speech: keyof typeof initialSpeechOptions) => {
  return initialSpeechOptions[speech] || "";
};