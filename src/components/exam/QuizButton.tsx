import React from "react";
import { JadgeTask } from "@/ts/Task";

type QuizButtonProps = {
  onClick: () => void;
  candidate: JadgeTask;
  isJadge: boolean | null;
};

const QuizButton = ({ onClick, candidate,isJadge }: QuizButtonProps) => {
  return (
    <li>
      <button
        className={`btn mt-9 mb-2 w-full text-white py-2 px-4 text-lg bg-primary ${
          isJadge !== null && candidate.correct
            ? "disabled:bg-accent disabled:text-white"
            : isJadge !== null && !candidate.correct
            ? "disabled:bg-error disabled:text-white"
            : ""
        }`}
        onClick={onClick}
        disabled={isJadge !== null}
      >
        {candidate.jaName}
      </button>
    </li>
  );
};

export default QuizButton;
