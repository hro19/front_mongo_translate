import React from "react";
import axios from "axios";
import { GetServerSideProps } from "next";

const Task = ({ task }: any) => {
  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.completed ? "Completed" : "Not Completed"}</p>
    </div>
  );
};

export default Task;

export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const res = await axios.get(`http://localhost:5000/api/v1/tasks/${slug}`);
  const task = res.data;

  return {
    props: {
      task,
    },
  };
}
