import React from 'react'
import axios from "axios";
import { Task, TaskIterateObj } from "../../ts/Task";

interface TaskDeleteProps {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskEdit = ({ task, tasks, setTasks }: TaskDeleteProps) => {
  const handleEdit = async (id: string, editedTask: Task) => {
    try {
      const response = await axios.patch(
        `https://back-mongo-task2.vercel.app/api/v1/tasks/${id}`,
        editedTask
      );
      setTasks(
        tasks.map((task: Task) => {
          if (task._id === id) {
            return response.data.task;
          }
          return task;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
        onClick={() =>
          handleEdit(task._id, { ...task, completed: !task.completed })
        }
      >
        Toggle Completion
      </button>
    </>
  );
};

export default TaskEdit