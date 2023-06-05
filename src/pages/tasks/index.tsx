import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Inter } from "next/font/google";
import { useAtom } from "jotai";
import { isSnakeAtom } from "../../jotai/atoms";
import TaskCreate from "../../components/tasks/TaskCreate";
import TaskTable from "../../components/tasks/TaskTable";
import SnakeMessage from "../../components/taskShingle/SnakeMessage";
import { Task } from "../../ts/Task";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //popoverメッセージを制御する
  const [isSnake, setIsSnake] = useAtom(isSnakeAtom);

  //すべてのタスクを取得＆react-queryでキャッシュ管理
  const fetchTasks = async () => {
    const { data } = await axios.get(
      "https://back-mongo-task2.vercel.app/api/v1/tasks"
    );
    return data;
  };

  const { data, isLoading, isError } = useQuery<Task[]>("tasks", fetchTasks);

  if (isError) {
    return <div>Error fetching tasks.</div>;
  }

  return (
    <main>
      <div className="container mx-auto mt-5">
        <h1 className="text-2xl font-bold my-5 text-center">Tasks</h1>
        <TaskCreate />
        <TaskTable tasks={data} isLoading={isLoading} />
        {isSnake && <SnakeMessage />}
      </div>
    </main>
  );
}
