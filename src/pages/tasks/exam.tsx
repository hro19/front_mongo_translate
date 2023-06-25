import React, { useState, useEffect } from "react";
import { Task } from "@/ts/Task";
import { useAtom } from "jotai";
import { allTasksAtom } from "../../jotai/atoms";
import QuizButton from "@/components/exam/QuizButton";
import { selectRandomQuiz } from "@/components/exam/quizUtils";

const Exam = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  type Gamen = "default" | "question" | "answer" | "finish";
  const [gamen, setGamen] = useState<Gamen>("default");
  const [quizList, setQuizList] = useState<any | null>(null);
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
    <div>
      {allTasks !== null && allTasks.length > 0 && (
        <div className="mx-auto max-w-[640px]">
          <h2>{quizList && quizList[0].name}の意味は</h2>
          <ul className="flex flex-col justify-center">
            {quizList[0].candidates.map((candidate: Task, index: number) => (
              <QuizButton
                key={index}
                onClick={() => changeHandle(candidate.name)}
                candidate={candidate}
              />
            ))}
          </ul>
          {answers.map((answer, index) => (
            <p key={index}>{answer}</p>
          ))}
          <hr />
          {gamen}
        </div>
      )}
    </div>
  );
};

export default Exam;
