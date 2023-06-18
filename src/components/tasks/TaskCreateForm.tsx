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
    <div className="flex justify-center">
      <div className="grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap">
        <label className="mr-4 flex items-center">
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
            render={({ field }: any) => (
              <input
                {...field}
                placeholder="英単語"
                className="ml-2 border rounded p-2"
              />
            )}
          />
          {errors.name && (
            <span className="text-red-500 ml-2">{errors.name.message}</span>
          )}
        </label>
        <label className="mr-4 flex items-center">
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
              <input
                {...field}
                placeholder="日本語訳"
                className="ml-2 border rounded p-2"
              />
            )}
          />
          {errors.jaName && (
            <span className="text-red-500 ml-2">{errors.jaName.message}</span>
          )}
        </label>
        <label className="mr-4 flex items-center">
          <Controller
            control={control}
            name="speech"
            rules={{ required: "品詞を選択してください" }}
            render={({ field }) => (
              <div>
                <select
                  className="select border border-gray-300 w-full max-w-[130px] ml-2"
                  id="speech"
                  {...field}
                >
                  <option disabled value="">
                    品詞を選択
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
        <label className="flex items-center">
          <Controller
            name="completed"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="checkbox"
                id="completed"
                className="ml-4 h-5 w-5"
                value=""
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
      </div>
    </div>
  );
};

export default TaskCreateForm;
