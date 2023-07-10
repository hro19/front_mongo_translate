import { atom, useAtomValue } from "jotai";
import { CandidatesTask } from "../ts/Task";
import { Result, Gamen, Chart } from "../ts/Exam";

// 単語テストページ
export const HOWManyLesson: number = 5; //問題数
export const HOWManySelect: number = 4; //問題時の選択肢の数
export const countdownTime = 4; //回答中の残り時間

// export const failuresAtom = atom<CandidatesTask[]>([]);

export const gamenAtom = atom<Gamen>("default");
export const quizListCountAtom = atom<number>(0);
export const isJadgeAtom = atom<boolean | null>(null);

export const remainingTimeAtom = atom<number>(countdownTime);
export const isTimeZeroAtom = atom<boolean>(false);

export const resultsAtom = atom<Result[]>([]);
export const quizListDataAtom = atom<CandidatesTask[]>([]);

export const chartsAtom = atom<Chart[]>([]);
