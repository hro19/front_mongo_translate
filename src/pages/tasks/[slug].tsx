import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import EditBox from "../../components/tasks/EditBox";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

const TaskSingle = (task: Task) => {
  const [currentTask, setCurrentTask] = useState(task);

  const handleUpdateTask = (updatedTask: Task) => {
    setCurrentTask(updatedTask);
  };

  return (
    <>
      <div>
        <h1>{currentTask.name}</h1>
        <p>{currentTask.completed ? "Completed" : "Not Completed"}</p>
      </div>
      <EditBox
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

export default TaskSingle;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query;
  const res = await axios.get(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${slug}`
  );
  const task = res.data;

  return {
    props: {
      task,
    },
  };
};
