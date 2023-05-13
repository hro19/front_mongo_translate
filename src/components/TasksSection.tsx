import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

import TaskIterate from "../components/TaskIterate";
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
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Completed</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <TaskIterate tasks={tasks} setTasks={setTasks} />
      </table>
    </div>
  );
};

export default TasksSection;
