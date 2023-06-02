import React, { useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";
import SlugForm from "../../components/taskShingle/SlugForm";
import { TaskObj } from "../../ts/Task";

export const getServerSideProps: GetServerSideProps<TaskObj> = async (context) => {
  const { slug } = context.query;

  try {
    const response = await axios.get(
      `https://back-mongo-task2.vercel.app/api/v1/tasks/${slug}`
    );
    const task = response.data;

    return {
      props: {
        task,
      },
    };
  } catch (error) {
    console.error("Error fetching single task:", error);
    return {
      props: {
        task: null,
      },
    };
  }
};

const SingleTaskPage = ({ task }: TaskObj) => {
  const [currentTask, setCurrentTask] = useState(task);

  return (
    <>
      <div>
        <h1>{currentTask.name}</h1>
        <p>{currentTask._id}</p>
        <p>{currentTask.completed ? "Completed" : "Not Completed"}</p>
      </div>
      <SlugForm
        task={currentTask}
        setCurrentTask={setCurrentTask}
      />
      <Link href="/tasks/" className="text-4xl mt-6">
        トップに戻る
      </Link>
    </>
  );
};

export default SingleTaskPage;
