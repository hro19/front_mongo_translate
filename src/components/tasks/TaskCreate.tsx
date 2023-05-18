import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface TaskData {
  name: string;
  completed: boolean;
  // その他のタスクデータのプロパティを定義
}

interface TaskCreateProps {
  refetch: () => void;
}

interface FormData {
  name: string;
  completed: boolean;
}

const TaskCreate: React.FC<TaskCreateProps> = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    try {
      await axios.post(
        "https://back-mongo-task2.vercel.app/api/v1/tasks",
        data
      );
      refetch(); // タスクリストを更新する
      e?.target.reset(); // フォームの値をリセットする
    } catch (error) {
      console.error(error);
    }
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
              required: true,
              maxLength: 20,
            })}
            className="ml-2 border rounded p-2 h-full"
          />
          {errors.name && errors.name.type === "required" && (
            <span className="text-red-500 ml-2">名前は必須です</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span className="text-red-500 ml-2">
              名前は20文字以内である必要があります
            </span>
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
        <input
          type="submit"
          value="追加"
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
};

export default TaskCreate;
