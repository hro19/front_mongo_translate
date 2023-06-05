import { atom } from 'jotai';

export const tasksStateAtom = atom("completed");


export const isSnakeAtom = atom(false);
export const snakeDurationAtom = atom(2000);
export const checkEditAtom = atom(false);

export const nameAtom = atom("");
export const completedAtom = atom(false);

export const taskAtom = atom({ _id: "", name: "", completed: false });
