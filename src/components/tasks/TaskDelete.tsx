import React from 'react'
import axios from "axios";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

const TaskDelete = ({ refetch, task }: any) => {
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://back-mongo-task2.vercel.app/api/v1/tasks/${id}`
      );
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
        onClick={() => handleDelete(task._id)}
      >
        Delete
      </button>
    </>
  );
};

export default TaskDelete
