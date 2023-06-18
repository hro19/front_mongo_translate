import React from "react";
import { FormData } from "../../ts/Task";
import { FieldErrors, Control, Controller } from "react-hook-form";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

type TaskCreateFormProps = {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};

const TaskCreateForm = ({ control, errors }: TaskCreateFormProps) => {
  return (
    <>
      <label className="mr-4 flex items-center h-full">
        <span>英単語</span>
        <Controller
          name="name"
          control={control}
          rules={{
            required: "英単語は必須です",
            maxLength: {
              value: 20,
              message: "英単語は20文字以内である必要があります",
            },
          }}
          render={({ field }) => (
            <input {...field} className="ml-2 border rounded p-2 h-full" />
          )}
        />
        {errors.name && (
          <span className="text-red-500 ml-2">{errors.name.message}</span>
        )}
      </label>
      <label className="mr-4 flex items-center h-full">
        <span>日本語訳</span>
        <Controller
          name="jaName"
          control={control}
          rules={{
            required: "日本語訳は必須です",
            maxLength: {
              value: 30,
              message: "日本語訳は30文字以内である必要があります",
            },
          }}
          render={({ field }) => (
            <input {...field} className="ml-2 border rounded p-2 h-full" />
          )}
        />
        {errors.jaName && (
          <span className="text-red-500 ml-2">{errors.jaName.message}</span>
        )}
      </label>
      <label className="mr-4 flex items-center h-full">
        品詞
        <Controller
          control={control}
          name="speech"
          rules={{ required: "品詞を選択してください" }}
          render={({ field }) => (
            <div>
              <select
                className="select border border-gray-300 w-full max-w-xs"
                id="speech"
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
      </label>
      <label className="flex items-center h-full">
        <Controller
          name="completed"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="checkbox"
              className="ml-4 h-5 w-5"
              value={field.value ? "true" : "false"}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
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

export default TaskCreateForm;
