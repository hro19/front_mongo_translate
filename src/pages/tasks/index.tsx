import React from "react";
import { Inter } from "next/font/google";
import TaskCreate from "../../components/tasks/TaskCreate";
import TasksSection from "../../components/tasks/TasksSection";
import { useAtom } from "jotai";
import { isSnakeAtom } from "../../jotai/atoms";
import SnakeMessage from "../../components/taskShingle/SnakeMessage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //popoverメッセージを制御する
  const [isSnake, setIsSnake] = useAtom(isSnakeAtom);

  return (
    <main>
      <div className="container mx-auto mt-5">
        <h1 className="text-2xl font-bold my-5 text-center">Tasks</h1>
        <TaskCreate />
        <TasksSection />
        {isSnake && <SnakeMessage />}
      </div>
    </main>
  );
}
