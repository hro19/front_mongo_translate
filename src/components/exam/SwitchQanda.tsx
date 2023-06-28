import React from 'react';
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


const SwitchQanda = ({ quizListData }: { quizListData: CandidatesTask[] }) => {
  const [failures, setFailures] = useAtom(failuresAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);

  const changeHandle = (name: string, currentQuizData: CandidatesTask) => {
    if (name === quizListData[quizListCount].name) {
      setIsJadge(true);
    } else {
      setIsJadge(false);
      setFailures((prevFailures) => [...prevFailures, currentQuizData]);
    }
    setGamen("answer");
  };

  const handleButtonClick = () => {
    setQuizListCount((prevCount) => prevCount + 1);
    setIsJadge(null);
    //setQuizListCountを使うと非同期で計算が遅れるためにquizListCountを利用して計算する。
    quizListCount + 1 == HOWManyLesson ? setGamen("finish") : setGamen("question");
  };

  return (
    <div>
      {quizListData && (
        <div>
          <h2>
            <span className="text-6xl font-bold text-emerald-800">
              {quizListData[quizListCount].name}
            </span>
            の意味は
          </h2>
          <ul className="flex flex-col justify-center">
            {quizListData[quizListCount].candidates.map(
              (candidate: JadgeTask, index: number) => (
                <QuizButton
                  key={index}
                  onClick={() =>
                    changeHandle(candidate.name, quizListData[quizListCount])
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
            onClick={handleButtonClick}
            className="btn bg-amber-500 text-white mt-4 mb-4 justify-end"
          >
            次の問題へ
          </button>
        )}
      </div>
    </div>
  );
};

export default SwitchQanda
