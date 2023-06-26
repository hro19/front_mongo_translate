import { useState, useEffect } from "react";
import { Task, CandidatesTask, JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import {
  failuresAtom,
  gamenAtom,
  quizListCountAtom,
  isJadgeAtom,
} from "../../jotai/atoms";
import { selectRandomQuiz } from "../../components/exam/quizUtils";
import SwitchQanda from "../../components/exam/SwitchQanda";
import SwitchFinish from "../../components/exam/SwitchFinish";

const HOWManyLesson: number = 5;
const HOWManySelect: number = 4;

const Exam = ({ quizListData }: { quizListData: CandidatesTask[] }) => {
  const [failures, setFailures] = useAtom(failuresAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [isJadge, setIsJadge] = useAtom(isJadgeAtom);

  return (
    <>
      <div className="mx-auto max-w-[640px]">
        {quizListCount < HOWManyLesson ? (
          <SwitchQanda quizListData={quizListData} />
        ) : (
          <SwitchFinish />
        )}
      </div>
      {failures.map((failure, index) => (
        <p key={index}>{failure}</p>
      ))}
      <hr />
      {gamen}
      <div>
        <p>quizListCount: {quizListCount}</p>
      </div>
    </>
  );
};

export async function getStaticProps() {
  try {
    const response = await fetch("https://back-mongo-task2.vercel.app/api/v1/tasks");
    const data = await response.json();
    const filteredData = data.filter((task: Task) => task.speech === "verb");
    const quizListData = selectRandomQuiz(filteredData, HOWManyLesson, HOWManySelect);
    return {
      props: {
        quizListData,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        quizListData: [],
      },
    };
  }
}

export default Exam;
