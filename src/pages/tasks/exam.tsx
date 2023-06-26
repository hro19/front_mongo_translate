import { useState,useEffect } from "react";
import { Task, CandidatesTask,JadgeTask } from "@/ts/Task";
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

  const handleButtonClick = () => {
    setQuizListCount((prevCount) => prevCount + 1);
    setIsJadge(null);
    setGamen("question");
  };

  return (
    <>
      <div className="mx-auto max-w-[640px]">
        <SwitchQanda quizListData={quizListData} />
        <SwitchFinish />
        <p className="mt-3">【正解判定】{isJadge !== null && isJadge.toString()}</p>
      </div>
      {failures.map((failure, index) => (
        <p key={index}>{failure}</p>
      ))}
      <hr />
      {gamen}
      <div>
        <button onClick={handleButtonClick} className="btn bg-orange-600">
          増やす
        </button>
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
