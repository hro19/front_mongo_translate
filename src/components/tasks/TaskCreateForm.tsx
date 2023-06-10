import React from 'react';
import { FormData } from "../../ts/Task";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

type TaskCreateFormProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

const TaskCreateForm = ({ register, errors }: TaskCreateFormProps) => {
  return (
    <>
      <label className="mr-4 flex items-center h-full">
        <span>英単語</span>
        <input
          {...register("name", {
            required: {
              value: true,
              message: "英単語は必須です",
            },
            maxLength: {
              value: 20,
              message: "英単語は20文字以内である必要があります",
            },
          })}
          className="ml-2 border rounded p-2 h-full"
        />
        {errors.name && (
          <span className="text-red-500 ml-2">{errors.name.message}</span>
        )}
      </label>
      <label className="mr-4 flex items-center h-full">
        <span>日本語訳</span>
        <input
          {...register("jaName", {
            required: {
              value: true,
              message: "日本語訳は必須です",
            },
            maxLength: {
              value: 30,
              message: "日本語訳は30文字以内である必要があります",
            },
          })}
          className="ml-2 border rounded p-2 h-full"
        />
        {errors.jaName && (
          <span className="text-red-500 ml-2">{errors.jaName.message}</span>
        )}
      </label>
      <label className="flex items-center h-full">
        <input
          {...register("completed")}
          type="checkbox"
          className="ml-4 h-5 w-5"
        />
        <span className="ml-2">暗記済</span>
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
    </>
  );
};

export default TaskCreateForm

