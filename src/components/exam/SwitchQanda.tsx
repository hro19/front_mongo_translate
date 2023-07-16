import React from "react";
import { JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import {
  gamenAtom,
  quizListCountAtom,
  quizListDataAtom
} from "../../jotai/examsAtoms";
import QuizButton from "../../components/exam/QuizButton";
import MaruBatsu from "../../components/exam/MaruBatsu";
import TimeCount from "../../components/exam/TimeCount";
import SwithchAnswer from "../../components/exam/SwitchAnswer";

const SwitchQanda = () => {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [quizListData, setquizListData] = useAtom(quizListDataAtom);

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
                  candidate={candidate}
                  name={candidate.name}
                  currentQuizData ={quizListData[quizListCount]}
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
