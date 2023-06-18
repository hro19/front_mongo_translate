import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { TaskObj } from "../../ts/Task";
import { AiOutlineUserDelete } from "react-icons/ai";

const TaskDelete = ({ task }: TaskObj) => {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation(
    async (id: string) => {
      await axios.delete(
        `https://back-mongo-task2.vercel.app/api/v1/tasks/${id}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
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
        <span className="hidden md:inline-block">Delete</span>
      </button>
    </>
  );
};

export default TaskDelete;
