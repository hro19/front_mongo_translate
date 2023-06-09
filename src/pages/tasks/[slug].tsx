import React, { useState,useEffect } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";
import { useAtom } from "jotai";
import { isSnakeAtom, taskAtom } from "../../jotai/atoms";
import SlugForm from "../../components/taskShingle/SlugForm";
import SnakeMessage from "../../components/taskShingle/SnakeMessage";
import { CurrentTaskObj } from "../../ts/Task";

export const getServerSideProps: GetServerSideProps<CurrentTaskObj> = async (
  context
) => {
  const { slug } = context.query;

  try {
    const response = await axios.get(
      `https://back-mongo-task2.vercel.app/api/v1/tasks/${slug}`
    );
    const currentTask = response.data;

    return {
      props: {
        currentTask,
      },
    };
  } catch (error) {
    console.error("Error fetching single task:", error);
    return {
      props: {
        currentTask: null,
      },
    };
  }
};

const SingleTaskPage = ({ currentTask }: CurrentTaskObj) => {
  const [task, setTask] = useAtom(taskAtom);

  //currentTaskをTaskとしてセットする
  useEffect(() => {
    setTask(currentTask);
  }, []);

  //popoverメッセージを制御する
  const [isSnake, setIsSnake] = useAtom(isSnakeAtom);

  return (
    <>
      <div>
        <h1>{task._id}</h1>
        <p>{task.name}</p>
        <p>{task.jaName}</p>
        <p>{task.completed ? "完了" : "進行中"}</p>
      </div>
      <SlugForm />
      {isSnake && <SnakeMessage />}
      <Link href="/tasks/" className="text-4xl mt-6">
        トップに戻る
      </Link>
    </>
  );
};

export default SingleTaskPage;
