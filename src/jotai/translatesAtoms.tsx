import { atom } from 'jotai';
import {
  Translate,
  TranslateObj,
  SortOrderProp,
  FilterOptionProp,
} from "../ts/Translate";

//translate新規ページ
export const inputTextAtom = atom<string>("");
export const translatedTextAtom = atom<string>("");

export const jaContentAtom = atom<string>("");
export const enContentAtom = atom<string>("");

//translate新規ページのLatest
export const sortOrderAtom = atom<SortOrderProp>("desc");
export const pageSizeAtom = atom<number>(10);
export const filterOptionAtom = atom<FilterOptionProp>("default");


//translate一覧ページ
export const showPostsAtom = atom<Translate[]>([]);
export const currentPageAtom = atom<number>(1);
export const itemsPerPageAtom = atom<number>(6);

//現在音声再生中かを判断
export const isSpeakingAtom = atom<boolean>(false);
