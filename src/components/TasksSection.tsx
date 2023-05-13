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

  const handleCreateTask = () => {
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching tasks.</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <TaskCreate fetchTasks={handleCreateTask} />

      <TaskTable tasks={tasks} setTasks={refetch} />
    </div>
  );
};

export default TasksSection;