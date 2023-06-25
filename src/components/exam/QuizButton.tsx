import React from "react";
import { Task } from "@/ts/Task";

type QuizButtonProps = {
  onClick: () => void;
  candidate: Task;
  isJadge:boolean | null;
};

const QuizButton = ({ onClick, candidate,isJadge }: QuizButtonProps) => {
  return (
    <li>
      <button
        className={`btn mt-9 mb-2 w-full text-white py-2 px-4 text-lg bg-primary ${
          isJadge
            ? "disabled:bg-accent disabled:text-white"
            : "disabled:bg-error disabled:text-white"
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
