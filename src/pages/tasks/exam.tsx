import React, { useState, useEffect } from "react";
import { Task } from "@/ts/Task";
import { useAtom } from "jotai";
import { allTasksAtom } from "../../jotai/atoms";
import QuizButton from "@/components/exam/QuizButton";

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

    const selectRandomQuiz = (filteredData: any, count: number) => {
    const selectedQuizzes: any = [];

    for (let i = 0; i < count; i++) {
        if (filteredData.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredData.length);
        const randomQuiz = filteredData[randomIndex];
        randomQuiz.candidates = [randomQuiz]; // ランダムなクイズをcandidatesの最初の要素に追加

        // 他の候補をランダムに選ぶ
        const otherIndices = getRandomUniqueIndices(filteredData.length, randomIndex, 2);
        for (const index of otherIndices) {
            randomQuiz.candidates.push(filteredData[index]);
        }

        selectedQuizzes.push(randomQuiz);
        filteredData.splice(randomIndex, 1);
        }
    }

    setQuizList(selectedQuizzes);
    };

    // ランダムな一意のインデックスを取得するヘルパー関数
    const getRandomUniqueIndices = (
    length: number,
    excludeIndex: number,
    count: number
    ): number[] => {
    const indices = [];
    for (let i = 0; i < length; i++) {
        if (i !== excludeIndex) {
        indices.push(i);
        }
    }

    const randomIndices = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        randomIndices.push(indices[randomIndex]);
        indices.splice(randomIndex, 1);
    }

    return randomIndices;
    };
    
  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch("https://back-mongo-task2.vercel.app/api/v1/tasks");
        const data = await response.json();
        const filteredData = data.filter((task: Task) => task.speech === "verb");
        setAllTasks(filteredData);
        selectRandomQuiz(filteredData, 3);
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
