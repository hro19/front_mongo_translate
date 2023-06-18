import React from "react";
import { Controller } from "react-hook-form";

const SlugFormInput = ({ task, control,formState, errors }: any) => {
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
        <label
          htmlFor="speech"
          className="block text-base font-medium text-gray-700"
        >
          品詞
        </label>
        <Controller
          control={control}
          name="speech"
          rules={{ required: "品詞を選択してください" }}
          render={({ field }) => (
            <div>
              <select
                className="select border border-gray-300 w-full max-w-xs"
                id="speech"
                defaultValue={task.speech ? task.speech : ""}
                {...field}
              >
                <option disabled value="">
                  品詞を選択してください
                </option>
                <option value="verb">verb</option>
                <option value="adjective">adjective</option>
                <option value="adverb">adverb</option>
                <option value="noun">noun</option>
                <option value="auxiliary verb">auxiliary verb</option>
                <option value="gerund">gerund</option>
              </select>
              {errors.speech && (
                <span className="text-red-500">{errors.speech.message}</span>
              )}
            </div>
          )}
        />
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
        disabled={!formState.isDirty}
        className={`py-2 px-4 rounded font-bold text-white ${
          formState.isDirty
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        送信
      </button>
    </>
  );
};

export default SlugFormInput;
