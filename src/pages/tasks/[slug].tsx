import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import EditBox from "../../components/EditBox";

const TaskSingle = ({ task }: any) => {
  return (
    <>
      <div>
        <h1>{task.name}</h1>
        <p>{task.completed ? "Completed" : "Not Completed"}</p>
      </div>
      <EditBox task={task} />
    </>
  );
};

export default TaskSingle;

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const res = await axios.get(
    `https://back-mongo-task.vercel.app/api/v1/tasks/${slug}`
  );
  const task = res.data;

  return {
    props: {
      task,
    },
  };
}
