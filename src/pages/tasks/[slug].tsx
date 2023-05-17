import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";
import EditBox from "../../components/tasks/EditBox";

const TaskSingle = ({ task }: any) => {
  const [currentTask, setCurrentTask] = useState(task);

  const handleUpdateTask = (updatedTask: any) => {
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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
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
