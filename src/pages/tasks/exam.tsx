import React, { useState, useEffect } from "react";
import { Task } from "@/ts/Task";
import { useAtom } from "jotai";
import { allTasksAtom, quizListAtom } from "../../jotai/atoms";
import QuizButton from "@/components/exam/QuizButton";
import { selectRandomQuiz, shuffleArray } from "@/components/exam/quizUtils";

const Exam = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  type Gamen = "default" | "question" | "answer" | "finish";
  const [gamen, setGamen] = useState<Gamen>("default");
    const [quizList, setQuizList] = useAtom(quizListAtom);
    const [quizListCount, setQuizListCount] = useState<number>(0);
//  const [isJadge, setIsJadge] = useState<boolean | null>(null);

    
  const [allTasks, setAllTasks] = useAtom(allTasksAtom);

    const handleButtonClick = () => {
      setQuizListCount((prevCount) => prevCount + 1);
    };
    
  const changeHandle = (value: string) => {
    setAnswers((prevAnswers) => [...prevAnswers, value]);
    setGamen("answer");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://back-mongo-task2.vercel.app/api/v1/tasks");
        const data = await response.json();
        const filteredData = data.filter((task: Task) => task.speech === "verb");
        setAllTasks(filteredData);
        const selectedQuizzes = selectRandomQuiz(filteredData, 3);
        setQuizList(selectedQuizzes);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

    return (
      <>
        <div className="mx-auto max-w-[640px]">
          <div>
            {quizList !== null && quizList.length > 0 && (
              <div>
                <h2>
                  <span className="text-6xl font-bold text-emerald-800">
                    {quizList[quizListCount].name}
                  </span>
                  の意味は
                </h2>
                <ul className="flex flex-col justify-center">
                  {shuffleArray(quizList[quizListCount].candidates).map(
                    (candidate: Task, index: number) => (
                      <QuizButton
                        key={index}
                        onClick={() => changeHandle(candidate.name)}
                        candidate={candidate}
                      />
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        {answers.map((answer, index) => (
          <p key={index}>{answer}</p>
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

export default Exam;
