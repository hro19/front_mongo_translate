import React from "react";
import { Task } from "@/ts/Task";

type QuizButtonProps = {
  onClick: () => void;
  candidate: Task;
};

const QuizButton = ({ onClick, candidate }: QuizButtonProps) => {
  return (
    <li>
      <button
        className="btn mt-9 mb-2 w-full bg-primary text-white py-2 px-4 text-lg"
        onClick={onClick}
      >
        {candidate.jaName}
      </button>
    </li>
  );
};

export default QuizButton;
