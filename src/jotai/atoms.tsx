import { atom } from "jotai";
import { SelectSwitch, Task } from "../ts/Task";

//tasks一覧ページ
export const tasksStateAtom = atom<SelectSwitch>("all");

//tasksシングルページ
export const isSnakeAtom = atom<boolean>(false);
export const snakeDurationAtom = atom<number>(2000);
export const checkEditAtom = atom<boolean>(false);

export const nameAtom = atom<string>("");
export const jaNameAtom = atom<string>("");
export const completedAtom = atom<boolean>(false);

export const taskAtom = atom<Task>({
  _id: "",
  name: "",
  jaName: "",
  completed: false,
});
