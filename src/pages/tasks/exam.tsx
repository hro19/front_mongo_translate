import { useState,useEffect } from "react";
import { Task, CandidatesTask,JadgeTask } from "@/ts/Task";
import { useAtom } from "jotai";
import { allTasksAtom } from "../../jotai/atoms";
import QuizButton from "../../components/exam/QuizButton";
import { selectRandomQuiz } from "../../components/exam/quizUtils";

const Exam = ({ quizListData }: { quizListData: CandidatesTask[] }) => {
  const [failures, setFailures] = useState<string[]>([]);
  type Gamen = "default" | "question" | "answer" | "finish";
  const [gamen, setGamen] = useState<Gamen>("default");
  const [quizListCount, setQuizListCount] = useState<number>(0);
  const [isJadge, setIsJadge] = useState<boolean | null>(null);
  const [allTasks, setAllTasks] = useAtom(allTasksAtom);

  const handleButtonClick = () => {
    setQuizListCount((prevCount) => prevCount + 1);
    setIsJadge(null);
    setGamen("question");
  };

  const changeHandle = (name: string) => {
    if (name === quizListData[quizListCount].name) {
      setIsJadge(true);
    } else {
      setIsJadge(false);
      setFailures((prevFailures) => [...prevFailures, name]);
    }
    setGamen("answer");
  };

  return (
    <>
      <div className="mx-auto max-w-[640px]">
        <div>
          {quizListData.length > 0 && (
            <div>
              <h2>
                <span className="text-6xl font-bold text-emerald-800">
                  {quizListData[quizListCount].name}
                </span>
                の意味は
              </h2>
              <ul className="flex flex-col justify-center">
                {quizListData[quizListCount].candidates.map(
                  (candidate: JadgeTask, index: number) => (
                    <QuizButton
                      key={index}
                      onClick={() => changeHandle(candidate.name)}
                      candidate={candidate}
                      isJadge={isJadge}
                    />
                  )
                )}
              </ul>
            </div>
          )}
        </div>
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
    const quizListData = selectRandomQuiz(filteredData, 3);
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
