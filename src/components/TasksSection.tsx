import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

const TasksSection = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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

    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Tasks</h1>
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
        <tbody>
          {tasks.map((task: any, index: number) => (
            <tr key={task._id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <Link
                  href={`/tasks/${task._id}`}
                  className="underline"
                >
                  {task.name}
                </Link>
              </td>
              <td className="border px-4 py-2">
                {task.completed ? "✅" : "❌"}
              </td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                  Edit
                </button>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksSection;
