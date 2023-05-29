import React from 'react'
import axios from "axios";
import { TaskRefetch } from "../../ts/Task";
import { AiOutlineUserDelete } from "react-icons/ai";

const TaskDelete = ({ task, refetch }: TaskRefetch) => {
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
        <AiOutlineUserDelete
          className="icon text-white mb-1 mr-1 inline-block"
          size="1.2rem"
        />
        Delete
      </button>
    </>
  );
};

export default TaskDelete
