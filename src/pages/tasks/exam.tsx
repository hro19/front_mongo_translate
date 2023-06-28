import { useState, useEffect } from "react";
import { Task, CandidatesTask, JadgeTask} from "@/ts/Task";
import { useAtom } from "jotai";
import {
    HOWManyLesson,
    HOWManySelect,
  failuresAtom,
  gamenAtom,
  quizListCountAtom,
} from "../../jotai/atoms";
import { selectRandomQuiz } from "../../components/exam/quizUtils";
import SwitchDefault from "../../components/exam/SwitchDefault";
import SwitchQanda from "../../components/exam/SwitchQanda";
import SwitchFinish from "../../components/exam/SwitchFinish";

const Exam = ({ quizListData }: { quizListData: CandidatesTask[] }) => {
  const [failures, setFailures] = useAtom(failuresAtom);
  const [gamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);

  return (
    <>
      <div className="mx-auto max-w-[640px]">
        {(() => {
          switch (gamen) {
            case "default":
            //   return <SwitchDefault />;
            case "answer":
            case "question":
              return <SwitchQanda quizListData={quizListData} />;
            case "finish":
              return <SwitchFinish />;
            default:
              return null;
          }
        })()}
      </div>
      {/* {gamen} */}
      {/* <div><p>quizListCount: {quizListCount}</p></div> */}
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
