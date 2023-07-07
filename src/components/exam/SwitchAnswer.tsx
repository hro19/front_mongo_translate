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

  const updateResults = async () => {
    await setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[quizListCount].isCorrect = false;
      return updatedResults;
    });
  };

  //次の問題へボタン、またはエンターkeyを押したときの反応
  const nextQuizHandle = async (currentQuizData: CandidatesTask) => {
    const shouldUpdateResults =
      isJadge === null || isJadge === false || isTimeZero === true;

     if (shouldUpdateResults) {
       try {
         await updateResults();
         console.log(results[quizListCount].isCorrect);
       } catch (error: any) {
         console.log(error.message);
       }
     } else {
         console.log(results[quizListCount].isCorrect);
     }

    setQuizListCount((prevCount) => prevCount + 1);
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
