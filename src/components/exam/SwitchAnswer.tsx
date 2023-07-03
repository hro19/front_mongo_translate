import React, { useEffect } from "react";
import { CandidatesTask } from "../../ts/Task";
import { useAtom } from "jotai";
import {
  HOWManyLesson,
  failuresAtom,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
  isTimeZeroAtom
} from "../../jotai/atoms";

const SwitchAnswer = ({ currentQuizData }: { currentQuizData: CandidatesTask }) => {
  const [failures, setFailures] = useAtom(failuresAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);
  const [isTimeZero, setIsTimeZero] = useAtom(isTimeZeroAtom);

  //次の問題へボタン、またはエンターkeyを押したとき、またはタイムカウントがオーバーしたときの反応
  const nextQuizHandle = (currentQuizData: CandidatesTask) => {
    setQuizListCount((prevCount) => prevCount + 1);

    if (isJadge === null || isJadge === false || isTimeZero === true) {
      setFailures((prevFailures) => [...prevFailures, currentQuizData]);
    }
    setIsJadge(null); //正解か不正解を判断するフラグのリセット
    setIsTimeZero(false); //タイムカウント用のフラグのリセット

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
