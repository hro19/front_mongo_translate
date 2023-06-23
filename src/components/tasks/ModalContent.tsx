import React, { useState } from "react";
import axios from "axios";
import { Task } from "../../ts/Task";
import { useMutation, useQueryClient } from "react-query";
import ModalContentForm from "./ModalContentForm";
import { SecCount } from "../../components/taskShingle/Atarashiku";
import { useAtom } from "jotai";
import { isSnakeAtom,snakeDurationAtom } from "../../jotai/atoms";

//バックエンドのエンドポイントにアクセスして、アップデートの仕組みを定義する
//更新データをreact-queryを使って管理する

type ModalContentProps = {
  task: Task;
  closeModal: () => void;
};

const ModalContent = ({
  task,
  closeModal,
}: ModalContentProps) => {
  const [isSnake, setIsSnake] = useAtom(isSnakeAtom);
  const [snakeDuration, setSnakeDuration] = useAtom(snakeDurationAtom);
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

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    values: Omit<Task, "_id">
  ) => {
    e.preventDefault();

    const { name, jaName, speech, completed } = values;

    try {
      const updatedTask: Task = {
        ...task,
        name,
        jaName,
        speech,
        completed,
      };

      await updateTaskMutation.mutateAsync(updatedTask);

      // 更新成功の場合は、ポップオーバーで知らせる
      setIsSnake(true);
      SecCount(snakeDuration, setIsSnake);

      // モーダルを閉じる
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
            task={task}
            closeModal={closeModal}
            handleSubmit={(
              e: React.FormEvent<HTMLFormElement>,
              values: Omit<Task, "_id">
            ) => handleUpdate(e, values)}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalContent;
