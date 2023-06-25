import React, { useState, useEffect } from "react";
import { Task } from "@/ts/Task";
import { useAtom } from "jotai";
import { allTasksAtom, quizListAtom } from "../../jotai/atoms";
import QuizButton from "@/components/exam/QuizButton";
import { selectRandomQuiz } from "@/components/exam/quizUtils";

const Exam = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  type Gamen = "default" | "question" | "answer" | "finish";
  const [gamen, setGamen] = useState<Gamen>("default");
  const [quizList, setQuizList] = useAtom(quizListAtom);
  const [isJadge, setIsJadge] = useState<boolean | null>(null);

  const [allTasks, setAllTasks] = useAtom(allTasksAtom);

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
                {quizList !== null && quizList.map(
                  (quiz: Task & { candidates: Task[] }, quizIndex: number) => (
                    <div key={quizIndex}>
                      <h2>{quiz.name}の意味は</h2>
                      <ul className="flex flex-col justify-center">
                        {quiz.candidates.map(
                          (candidate: Task, candidateIndex: number) => (
                            <QuizButton
                              key={candidateIndex}
                              onClick={() => changeHandle(candidate.name)}
                              candidate={candidate}
                            />
                          )
                        )}
                      </ul>
                    </div>
                  )
                )}
              </div>
          </div>
        {answers.map((answer, index) => (
          <p key={index}>{answer}</p>
        ))}
        <hr />
        {gamen}
      </>
    );
};

export default Exam;
