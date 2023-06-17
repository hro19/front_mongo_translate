import React from "react";
import { Controller } from "react-hook-form";

const SlugFormInput = ({ task, control, errors }: any) => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-base font-medium text-gray-700"
        >
          名前
        </label>
        <Controller
          control={control}
          name="name"
          defaultValue={task.name}
          rules={{
            required: "名前は必須です",
            maxLength: {
              value: 10,
              message: "名前は10文字以下で入力してください",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="name"
              type="text"
              placeholder="名前を入力してください"
              className={`form-input py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent ${
                errors.name ? "border-red-500" : ""
              }`}
            />
          )}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="jaName"
          className="block text-base font-medium text-gray-700"
        >
          日本語訳
        </label>
        <Controller
          control={control}
          name="jaName"
          defaultValue={task.jaName}
          rules={{
            required: "日本語訳は必須です",
            maxLength: {
              value: 20,
              message: "日本語訳は20文字以下で入力してください",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="jaName"
              type="text"
              placeholder="日本語訳を入力してください"
              className={`form-input py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent ${
                errors.jaName ? "border-red-500" : ""
              }`}
            />
          )}
        />
        {errors.jaName && (
          <span className="text-red-500 text-sm">{errors.jaName.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="completed" className="flex items-center">
          <Controller
            control={control}
            name="completed"
            defaultValue={task.completed}
            render={({ field }) => (
              <input
                {...field}
                id="completed"
                type="checkbox"
                className="mr-2"
                checked={field.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.checked)
                }
              />
            )}
          />
          <span className="text-base text-gray-700">暗記済み</span>
        </label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
      >
        送信
      </button>
    </>
  );
};

export default SlugFormInput;
