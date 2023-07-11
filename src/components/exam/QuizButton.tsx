import React from "react";
import { JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import { gamenAtom } from "../../jotai/examsAtoms";

type QuizButtonProps = {
  onClick: () => void;
  candidate: JadgeTask;
};

const QuizButton = ({ onClick, candidate }: QuizButtonProps) => {
  const [gamen, setGamen] = useAtom(gamenAtom);

  return (
    <li>
      <button
        className={`btn normal-case mt-9 mb-2 w-full text-white py-2 px-4 text-lg bg-primary hover:bg-primary-focus ${
          gamen === "answer" && candidate.correct
            ? "disabled:bg-accent disabled:text-white"
            : gamen === "answer" && !candidate.correct
            ? "disabled:bg-error disabled:text-white"
            : ""
        }`}
        onClick={onClick}
        disabled={gamen === "answer"}
      >
        {gamen === "answer" ? `${candidate.name} | ` : ""}
        {candidate.jaName}
      </button>
    </li>
  );
};

export default QuizButton;
