import React from "react";
import { JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import {
  isJadgeAtom,
} from "../../jotai/atoms";

type QuizButtonProps = {
  onClick: () => void;
  candidate: JadgeTask;
};

const QuizButton = ({ onClick, candidate }: QuizButtonProps) => {
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);

  return (
    <li>
      <button
        className={`btn normal-case mt-9 mb-2 w-full text-white py-2 px-4 text-lg bg-primary ${
          isJadge !== null && candidate.correct
            ? "disabled:bg-accent disabled:text-white"
            : isJadge !== null && !candidate.correct
            ? "disabled:bg-error disabled:text-white"
            : ""
        }`}
        onClick={onClick}
        disabled={isJadge !== null}
      >
        {isJadge !== null ? `${candidate.name} | ` : ""}
        {candidate.jaName}
      </button>
    </li>
  );
};

export default QuizButton;
