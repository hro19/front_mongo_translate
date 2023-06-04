// tasksデータをrestAPIから取得、react-queryで通信

import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { Task } from "../../ts/Task";
import TaskTable from "./TaskTable";

const TasksSection = () => {
  const fetchTasks = async () => {
    const { data } = await axios.get(
      "https://back-mongo-task2.vercel.app/api/v1/tasks"
    );
    return data;
  };

  const {
    data,
    isLoading,
    isError,
  } = useQuery<Task[]>("tasks", fetchTasks);

  if (isError) {
    return <div>Error fetching tasks.</div>;
  }

  return (
    <>
      <TaskTable tasks={data} isLoading={isLoading} />
    </>
  );
};

export default TasksSection;