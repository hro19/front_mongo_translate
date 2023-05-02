import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const TaskCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await axios.post("https://back-mongo-task.vercel.app/api/v1/tasks", data);
      alert("タスクが追加されました");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-300 rounded-lg p-4 flex flex-row"
      >
        <label className="mr-4">
          Name:
          <input
            {...register("name", {
              required: true,
              maxLength: 20,
            })}
            className="ml-2 border rounded p-2"
          />
          {errors.name && errors.name.type === "required" && (
            <span>名前は必須です</span>
          )}
          {errors.name && errors.name.type === "maxLength" && (
            <span>名前は20文字以内である必要があります</span>
          )}
        </label>
        <label>
          Completed:
          <input {...register("completed")} type="checkbox" className="ml-2" />
        </label>
        <input
          type="submit"
          value="追加"
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        />
      </form>
    </div>
  );
};

export default TaskCreate;
