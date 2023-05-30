// tasksデータをrestAPIから取得、react-queryで通信

import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { Task } from "../../ts/Task";
import TaskTable from "./TaskTable";
import TaskCreate from "./TaskCreate";

const TasksSection = () => {
  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useQuery<Task[]>("tasks", async () => {
    const { data } = await axios.get(
      "https://back-mongo-task2.vercel.app/api/v1/tasks"
    );
    return data;
  });

  if (isError) {
    return <div>Error fetching tasks.</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <TaskCreate />

      <TaskTable tasks={tasks} isLoading={isLoading} />
    </div>
  );
};

export default TasksSection;