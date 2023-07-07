import { useState, useEffect } from "react";
import { Task, CandidatesTask, JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import {
  HOWManyLesson,
  HOWManySelect,
  gamenAtom,
  quizListCountAtom,
  resultsAtom,
} from "../../jotai/examsAtoms";
import SwitchDefault from "../../components/exam/SwitchDefault";
import SwitchQanda from "../../components/exam/SwitchQanda";
import SwitchFinish from "../../components/exam/SwitchFinish";

const Exam = ({ data }: { data: Task[] }) => {
  const [gamen] = useAtom(gamenAtom);
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [results, setResults] = useAtom(resultsAtom);

  return (
    <>
      <div className="mx-auto max-w-[640px]">
        {(() => {
          switch (gamen) {
            case "default":
              return <SwitchDefault data={data} />;
            case "answer":
            case "question":
              return <SwitchQanda />;
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

export async function getServerSideProps() {
  try {
    const response = await fetch("https://back-mongo-task2.vercel.app/api/v1/tasks");
    const data = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default Exam;
