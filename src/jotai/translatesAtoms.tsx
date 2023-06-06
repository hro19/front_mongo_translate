import { atom } from 'jotai';
import { Translate,TranslateObj } from "../ts/Translate";

//translate新規ページ
export const inputTextAtom = atom<string>("");
export const translatedTextAtom = atom<string>("");

//translate一覧ページ
export const showPostsAtom = atom<Translate[]>([]);
export const currentPageAtom = atom<number>(1);
export const itemsPerPageAtom = atom<number>(4);
