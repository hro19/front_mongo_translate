import React, { useEffect } from "react";
import { CandidatesTask } from "../../ts/Task";
import { useAtom } from "jotai";
import {
  HOWManyLesson,
  countdownTime,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
  isTimeZeroAtom,
  remainingTimeAtom,
  resultsAtom,
} from "../../jotai/examsAtoms";

const SwitchAnswer = ({ currentQuizData }: { currentQuizData: CandidatesTask }) => {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);
  const [isTimeZero, setIsTimeZero] = useAtom(isTimeZeroAtom);
  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom);
    const [results, setResults] = useAtom(resultsAtom);

  //次の問題へボタン、またはエンターkeyを押したときの反応
  const nextQuizHandle = (currentQuizData: CandidatesTask) => {
    setQuizListCount((prevCount) => prevCount + 1);

    if (isJadge === null || isJadge === false || isTimeZero === true) {
      setResults((prevResults) => {
        const updatedResults = prevResults.map((result) => {
          if (result._id === currentQuizData._id) {
            return { ...result, isCorrect: false };
          }
          return result;
        });
        return updatedResults;
      });
    }
    
    setIsJadge(null); //正解か不正解を判断するフラグのリセット
    setIsTimeZero(false); //タイムカウント用のフラグのリセット
    setRemainingTime(countdownTime);

    // setQuizListCountを使うと非同期で計算が遅れるためにquizListCountを利用して計算する。
    quizListCount + 1 === HOWManyLesson ? setGamen("finish") : setGamen("question");
  };

  //エンターkeyを押したときに次の問題に行くためのトリガー設定
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        nextQuizHandle(currentQuizData);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [quizListCount, isJadge, isTimeZero]);

  return (
    <div className="flex justify-end">
      {gamen === "answer" && (
        <button
          onClick={() => nextQuizHandle(currentQuizData)}
          className="btn btn-outline btn-primary mt-4 mb-4 justify-end"
        >
          次の問題へ
        </button>
      )}
    </div>
  );
};

export default SwitchAnswer;
