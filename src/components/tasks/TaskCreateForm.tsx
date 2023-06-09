import React from "react";
import { Task } from "../../ts/Task";
import { FieldErrors, Control, Controller } from "react-hook-form";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useAtom } from "jotai";
import { initialSpeechOptionsAtom } from "../../jotai/atoms";

type TaskCreateFormProps = {
  control: Control<Omit<Task, "_id">>;
  errors: FieldErrors<Omit<Task, "_id">>;
};

const TaskCreateForm = ({ control, errors }: TaskCreateFormProps) => {
  const [initialSpeechOptions] = useAtom(initialSpeechOptionsAtom);

  return (
    <div className="flex justify-center">
      <div className="grid gap-2 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap">
        <label className="flex flex-col">
          <Controller
            name="name"
            control={control}
            rules={{
              required: "英単語は必須です",
              maxLength: {
                value: 40,
                message: "英単語は40文字以内である必要があります",
              },
            }}
            render={({ field }: any) => (
              <input
                {...field}
                placeholder="英単語"
                className="w-full md:w-[280px] border rounded p-2"
              />
            )}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </label>
        <label className="flex flex-col">
          <Controller
            name="jaName"
            control={control}
            rules={{
              required: "日本語訳は必須です",
              maxLength: {
                value: 40,
                message: "日本語訳は40文字以内である必要があります",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="日本語訳"
                className="w-full md:w-[280px] border rounded p-2"
              />
            )}
          />
          {errors.jaName && <span className="text-red-500">{errors.jaName.message}</span>}
        </label>
        <label className="mr-4 flex items-center flex-col">
          <Controller
            control={control}
            name="speech"
            rules={{ required: "品詞を選択してください" }}
            render={({ field }) => (
              <div>
                <select
                  className="select border border-gray-300 w-full"
                  id="speech"
                  {...field}
                >
                  <option disabled value="">
                    品詞を選択
                  </option>
                  {Object.entries(initialSpeechOptions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
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
                id="completed_create"
                className="h-5 w-5"
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
