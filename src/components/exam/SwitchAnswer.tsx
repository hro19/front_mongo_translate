import React, { useEffect } from "react";
import axios from "axios";
import { CandidatesTask } from "../../ts/Task";
import { ExamCreate } from "../../ts/Exam";
import { useAtom } from "jotai";
import {
  HOWManyLesson,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
  isTimeZeroAtom,
  remainingTimeAtom,
  resultsAtom,
} from "../../jotai/examsAtoms";
import { RESET } from "jotai/utils";

const SwitchAnswer = ({ currentQuizData }: { currentQuizData: CandidatesTask }) => {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);
  const [isTimeZero, setIsTimeZero] = useAtom(isTimeZeroAtom);
  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom);
  const [results, setResults] = useAtom(resultsAtom);

  // DBに保存するためにAPIにpost送信する
  const createExamResult = async (newData: ExamCreate): Promise<void> => {
    try {
      const response = await axios.post(
        "https://back-mongo-task2.vercel.app/api/v1/exams/",
        newData
      );

      // 成功した場合の処理を記述
    } catch (error: any) {
      console.log(error.message);
      // エラー時の処理を記述
    }
  };

  //isCorrectの値を不正解ならば値をfalseに変更する
  const updateResults = async (): Promise<void> => {
    await setResults((prevResults) => {
      const updatedResults = [...prevResults];
      updatedResults[quizListCount].isCorrect = false;
      return updatedResults;
    });
  };

  //次の問題へボタン　もしくはスキップEnter
  const nextQuizHandle = async (currentQuizData: CandidatesTask) => {
    //Post用のデータ
    let newData: ExamCreate = {
      taskId: results[quizListCount]._id,
      isCorrect: results[quizListCount].isCorrect,
    };

    //問題をスキップしたか、間違ったか、タイムオーバーになったかを確認、いづれも不正解扱い
    const shouldUpdateResults =
      isJadge === null || isJadge === false || isTimeZero === true;

    if (shouldUpdateResults) {
      try {
        await updateResults();
        createExamResult({ ...newData, isCorrect: false });
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      createExamResult(newData);
    }

    setQuizListCount((prevCount) => prevCount + 1);
    setIsJadge(RESET);
    setIsTimeZero(RESET);
    setRemainingTime(RESET);

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
