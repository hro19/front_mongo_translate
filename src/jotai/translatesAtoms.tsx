import { atom } from 'jotai';
import { TranslateObj } from "../ts/Translate";

//translate新規ページ
export const inputTextAtom = atom<string>("");
export const translatedTextAtom = atom<string>("");

//translate一覧ページ
export const isSnakeAtom = atom(false);

