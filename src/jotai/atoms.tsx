import { atom } from 'jotai';
import { SelectSwitch } from "../ts/Task";

//tasks一覧ページ
export const tasksStateAtom = atom<SelectSwitch>("all");

//tasksシングルページ
export const isSnakeAtom = atom(false);
export const snakeDurationAtom = atom(2000);
export const checkEditAtom = atom(false);

export const nameAtom = atom("");
export const jaNameAtom = atom("");
export const completedAtom = atom(false);

export const taskAtom = atom({ _id: "", name: "",jaName:"", completed: false });
