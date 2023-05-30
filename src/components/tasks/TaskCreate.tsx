import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";

type FormData = {
  name: string;
  completed: boolean;
};

const TaskCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(
    async (data: FormData) => {
      await axios.post(
        "https://back-mongo-task2.vercel.app/api/v1/tasks",
        data
      );
    },
    {
      onSuccess: () => {
        //タスクリストのデータが最新の状態に更新されます。
        queryClient.invalidateQueries("tasks");
        //react-hook-formの関数で、フォームの値を初期化
        reset();
      },
    }
  );

  //タスク作成リクエストが発行されます;
  const onSubmit: SubmitHandler<FormData> = (data) => {
    createTaskMutation.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-8 bg-blue-50 border border-gray-300 rounded-lg p-4 flex flex-row items-center"
      >
        <label className="mr-4 flex items-center h-full">
          <span>Name:</span>
          <input
            {...register("name", {
              required: {
                value: true,
                message: "名前は必須です",
              },
              maxLength: {
                value: 20,
                message: "名前は20文字以内である必要があります",
              },
            })}
            className="ml-2 border rounded p-2 h-full"
          />
          {errors.name && (
            <span className="text-red-500 ml-2">{errors.name.message}</span>
          )}
        </label>
        <label className="flex items-center h-full">
          <input
            {...register("completed")}
            type="checkbox"
            className="ml-4 h-5 w-5"
          />
          <span className="ml-2">Completed</span>
        </label>
        <button
          type="submit"
          className="ml-4 bg-emerald-700 hover:bg-emerald-600 cursor-pointer text-white font-bold py-2 px-4 rounded"
        >
          <AiOutlineUsergroupAdd
            className="icon text-white mb-1 mr-1 inline-block"
            size="1.3rem"
          />
          追加
        </button>
      </form>
    </div>
  );
};

export default TaskCreate;
