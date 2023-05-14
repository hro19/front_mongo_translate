// tasksデータをrestAPIから取得、react-queryで通信

import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

import TaskTable from "../components/TaskTable";
import TaskCreate from "./TaskCreate";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

const TasksSection = () => {
  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useQuery<Task[]>("tasks", async () => {
    const { data } = await axios.get(
      "https://back-mongo-task.vercel.app/api/v1/tasks"
    );
    return data;
  });

  if (isError) {
    return <div>Error fetching tasks.</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <TaskCreate refetch={refetch} />

      <TaskTable tasks={tasks} setTasks={refetch} isLoading={isLoading} />
    </div>
  );
};

export default TasksSection;