import React, { useEffect } from "react";
import { CandidatesTask, JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import {
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
  quizListDataAtom
} from "../../jotai/examsAtoms";
import QuizButton from "../../components/exam/QuizButton";
import MaruBatsu from "../../components/exam/MaruBatsu";
import TimeCount from "../../components/exam/TimeCount";
import SwithchAnswer from "../../components/exam/SwitchAnswer";

const SwitchQanda = () => {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);
  const [quizListData, setquizListData] = useAtom(quizListDataAtom);

  //回答ボタンを押したときの反応
  const answeringHandle = (name: string, currentQuizData: CandidatesTask) => {
    setIsJadge(name === currentQuizData.name ? true : false);
    setGamen("answer");
  };

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
          <ul className="flex flex-col justify-center">
            {quizListData[quizListCount].candidates.map(
              (candidate: JadgeTask, index: number) => (
                <QuizButton
                  key={index}
                  onClick={() =>
                    answeringHandle(candidate.name, quizListData[quizListCount])
                  }
                  candidate={candidate}
                />
              )
            )}
          </ul>
        </div>
      )}
      {gamen === "answer" ? <MaruBatsu /> : <TimeCount />}
      <SwithchAnswer currentQuizData={quizListData[quizListCount]} />
    </div>
  );
};

export default SwitchQanda
