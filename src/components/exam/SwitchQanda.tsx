import React from 'react';
import { Task, CandidatesTask, JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import {
  failuresAtom,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
} from "../../jotai/atoms";
import QuizButton from "../../components/exam/QuizButton";

const SwitchQanda = ({ quizListData }: any) => {
  
  const [failures, setFailures] = useAtom(failuresAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);

  const changeHandle = (name: string) => {
    if (name === quizListData[quizListCount].name) {
      setIsJadge(true);
    } else {
      setIsJadge(false);
      setFailures((prevFailures) => [...prevFailures, name]);
    }
    setGamen("answer");
  };

  const handleButtonClick = () => {
    setQuizListCount((prevCount) => prevCount + 1);
    setIsJadge(null);
    setGamen("question");
  };

  return (
    <div>
      {quizListData.length > 0 && (
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
                  onClick={() => changeHandle(candidate.name)}
                  candidate={candidate}
                  isJadge={isJadge}
                />
              )
            )}
          </ul>
        </div>
      )}
      <p className="mt-3">【正解判定】{isJadge !== null && isJadge.toString()}</p>

      <button onClick={handleButtonClick} className="btn bg-orange-600 mt-4 mb-4">
        増やす
      </button>
    </div>
  );
};

export default SwitchQanda
