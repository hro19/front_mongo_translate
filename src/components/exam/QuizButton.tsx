import React, { useState, useEffect } from "react";
import { CandidatesTask, JadgeTask } from "@/ts/Task";
import { Gamen } from "../../ts/Exam";
import { useAtom } from "jotai";
import { gamenAtom, isJadgeAtom } from "../../jotai/examsAtoms";

type QuizButtonProps = {
  candidate: JadgeTask;
  name: string;
  currentQuizData: CandidatesTask;
};

const QuizButton = ({ candidate, name, currentQuizData }: QuizButtonProps) => {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    setIsAnswered(gamen === "answer" ? true : false);
  }, [gamen]);

  //回答ボタンを押したときの反応
  const answeringHandle = (name: string, currentQuizData: CandidatesTask) => {
    setIsJadge(name === currentQuizData.name ? true : false);
    setGamen("answer");
  };

  return (
    <li>
      <button
        className={`btn normal-case mt-9 mb-2 w-full text-white py-2 px-4 text-lg bg-primary hover:bg-primary-focus ${
          isAnswered && candidate.correct
            ? "disabled:bg-accent disabled:text-white"
            : isAnswered && !candidate.correct
            ? "disabled:bg-error disabled:text-white"
            : ""
        }`}
        onClick={() => answeringHandle(name, currentQuizData)}
        disabled={isAnswered}
      >
        {isAnswered ? `${candidate.name} | ` : ""}
        {candidate.jaName}
      </button>
    </li>
  );
};

export default QuizButton;
