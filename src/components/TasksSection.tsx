import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import TaskTable from "../components/TaskTable";
import TaskCreate from "./TaskCreate";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

const TasksSection = () => {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://back-mongo-task.vercel.app/api/v1/tasks"
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <TaskCreate fetchTasks={fetchTasks} />

      <TaskTable tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TasksSection;
