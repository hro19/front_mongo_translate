import { atom, useAtomValue } from "jotai";
import { atomWithReset } from "jotai/utils";
import { CandidatesTask } from "../ts/Task";
import { Result, Gamen, Chart } from "../ts/Exam";

// 単語テストページ
export const HOWManyLesson = 5 as const satisfies number; //問題数
export const HOWManySelect = 4 as const satisfies number; //問題時の選択肢の数
export const countdownTime = 4 as const satisfies number; //回答中の残り時間

// export const failuresAtom = atom<CandidatesTask[]>([]);

export const gamenAtom = atomWithReset<Gamen>("default");
export const quizListCountAtom = atomWithReset<number>(0);
export const isJadgeAtom = atomWithReset<boolean | null>(null);

export const remainingTimeAtom = atomWithReset<number>(countdownTime);
export const isTimeZeroAtom = atomWithReset<boolean>(false);

export const resultsAtom = atomWithReset<Result[]>([]);
export const quizListDataAtom = atomWithReset<CandidatesTask[]>([]);

export const chartsAtom = atom<Chart[]>([]);
