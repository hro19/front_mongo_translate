import React, { useState } from "react";
import axios from "axios";
import { Task, TaskObj } from "../../ts/Task";
import { useMutation, useQueryClient } from "react-query";
import ModalContentForm from "./ModalContentForm";

type ModalContentProps = TaskObj & {
  closeModal: () => void;
};

const ModalContent = ({ task, closeModal }: ModalContentProps) => {
  const [name, setName] = useState(task.name);
  const [completed, setCompleted] = useState(task.completed);

  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation(
    async (updatedTask: Task) => {
      await axios.patch(
        `https://back-mongo-task2.vercel.app/api/v1/tasks/${task._id}`,
        updatedTask,
        { headers: { "Content-Type": "application/json" } }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedTask: Task = {
        ...task,
        name,
        completed,
      };

      await updateTaskMutation.mutateAsync(updatedTask);

      //モーダルを閉じる
      closeModal();
    } catch (err) {
      console.error(err);
      // エラーが発生した場合は、適切なエラーハンドリングを行う
    }
  };

  return (
    <div className="">
      <div
        id="pop"
        className="flex h-full w-full justify-center items-center bg-white p-8 lg:max-w-[600px] mx-auto"
      >
        <form className="w-full sm:w-4/5 lg:w-1/2">
          <ModalContentForm
            name={name}
            setName={setName}
            completed={completed}
            setCompleted={setCompleted}
            task={task}
            closeModal={closeModal}
            handleUpdate={handleUpdate}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalContent;
