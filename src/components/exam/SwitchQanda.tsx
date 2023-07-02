import React, { useEffect } from "react";
import { Task, CandidatesTask, JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import {
    HOWManyLesson,
    HOWManySelect,
  failuresAtom,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
} from "../../jotai/atoms";
import QuizButton from "../../components/exam/QuizButton";
import MaruBatsu from "../../components/exam/MaruBatsu";
import TimeCount from "../../components/exam/TimeCount";


const SwitchQanda = ({ quizListData }: { quizListData: CandidatesTask[] }) => {
  const [failures, setFailures] = useAtom(failuresAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);

  const answeringHandle = (name: string, currentQuizData: CandidatesTask) => {
    if (name === quizListData[quizListCount].name) {
      setIsJadge(true);
    } else {
      setIsJadge(false);
      setFailures((prevFailures) => [...prevFailures, currentQuizData]);
    }
    setGamen("answer");
  };

const nextQuizHandle = (currentQuizData: CandidatesTask) => {
  setQuizListCount((prevCount) => prevCount + 1);

  if (isJadge === null) {
    setFailures((prevFailures) => [...prevFailures, currentQuizData]);
    setIsJadge(null);
  } else {
    setIsJadge(null);
  }

  // setQuizListCountを使うと非同期で計算が遅れるためにquizListCountを利用して計算する。
  quizListCount + 1 === HOWManyLesson ? setGamen("finish") : setGamen("question");
};

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          nextQuizHandle(quizListData[quizListCount]);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [quizListCount, isJadge]);

  return (
    <div>
      {quizListData && quizListData[quizListCount] && (
        <div>
          <h2>
            【{quizListCount + 1}問目】
            <span className="text-6xl font-bold text-emerald-800">
              {quizListData[quizListCount].name}
            </span>
            の意味は
          </h2>
          <TimeCount />
          <ul className="flex flex-col justify-center">
            {quizListData[quizListCount].candidates.map(
              (candidate: JadgeTask, index: number) => (
                <QuizButton
                  key={index}
                  onClick={() =>
                    answeringHandle(candidate.name, quizListData[quizListCount])
                  }
                  candidate={candidate}
                  isJadge={isJadge}
                />
              )
            )}
          </ul>
        </div>
      )}
      <p>{isJadge !== null && <MaruBatsu isJadge={isJadge} />}</p>

      <div className="flex justify-end">
        {gamen === "answer" && (
          <button
            onClick={() => nextQuizHandle(quizListData[quizListCount])}
            className="btn btn-outline btn-primary mt-4 mb-4 justify-end"
          >
            次の問題へ
          </button>
        )}
      </div>
    </div>
  );
};

export default SwitchQanda
