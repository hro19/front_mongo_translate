import React, { useState } from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";
import SlugEditBox from "../../components/tasks/SlugEditBox";
import { Task } from "../../ts/Task";

type SingleTaskPageProps = {
  task: Task;
};

const SingleTaskPage = ({ task }: SingleTaskPageProps) => {
  const [currentTask, setCurrentTask] = useState(task);
    const handleUpdateTask = (updatedTask: Task) => {
      setCurrentTask(updatedTask);
    };
    
  return (
    <>
      <div>
        <h1>{currentTask.name}</h1>
        <p>{currentTask._id}</p>
        <p>{currentTask.completed ? "Completed" : "Not Completed"}</p>
      </div>
      <SlugEditBox
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        onUpdateTask={handleUpdateTask}
      />
      <Link href="/tasks/" className="text-4xl mt-6">
        トップに戻る
      </Link>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  SingleTaskPageProps
> = async (context) => {
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

export default SingleTaskPage;
