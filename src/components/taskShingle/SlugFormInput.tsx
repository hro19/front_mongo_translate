import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Task } from "../../ts/Task";
import { useAtom } from "jotai";
import {checkEditAtom,initialSpeechOptionsAtom} from "../../jotai/atoms";
import { CheckEditDisabled } from "../../components/taskShingle/Atarashiku";

type SlugFormInputProps = {
  task: Task;
  control: any; // 適切な型を指定してください
  formState: any; // 適切な型を指定してください
  watch: any; // 適切な型を指定してください
  errors: any; // 適切な型を指定してください
};

const SlugFormInput = ({
  task,
  control,
  formState,
  watch,
  errors,
}: SlugFormInputProps) => {
  const [speechOptions, setSpeechOptions] = useAtom(initialSpeechOptionsAtom);

  const [checkEdit, setCheckEdit] = useAtom(checkEditAtom);
  const nameVal = watch("name");
  const jaNameVal = watch("jaName");
  const speechVal = watch("speech");
  const completedVal = watch("completed");

  //checkEdit関数　元データと現データが同じならば送信ボタンがDisableになる
  useEffect(() => {
    CheckEditDisabled(nameVal, jaNameVal, speechVal, completedVal, task, setCheckEdit);
  }, [{ nameVal, jaNameVal, speechVal, completedVal }]);

  return (
    <>
      <div className="mb-4">
        <label htmlFor="name" className="block text-base font-medium text-gray-700">
          名前
        </label>
        <Controller
          control={control}
          name="name"
          defaultValue={task.name}
          rules={{
            required: "名前は必須です",
            maxLength: {
              value: 40,
              message: "名前は40文字以下で入力してください",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="name"
              type="text"
              placeholder="名前を入力してください"
              className={`w-64 form-input py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent ${
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
        <label htmlFor="jaName" className="block text-base font-medium text-gray-700">
          日本語訳
        </label>
        <Controller
          control={control}
          name="jaName"
          defaultValue={task.jaName}
          rules={{
            required: "日本語訳は必須です",
            maxLength: {
              value: 40,
              message: "日本語訳は40文字以下で入力してください",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="jaName"
              type="text"
              placeholder="日本語訳を入力してください"
              className={`w-64 form-input py-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent ${
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
        <label htmlFor="speech" className="block text-base font-medium text-gray-700">
          品詞
        </label>
        <Controller
          control={control}
          name="speech"
          defaultValue={task.speech ? task.speech : ""}
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
                {Object.entries(speechOptions).map(([key, value]) => (
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
        disabled={!checkEdit}
        className={`py-2 px-4 rounded font-bold text-white ${
          checkEdit ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
        }`}
      >
        送信
      </button>
    </>
  );
};

export default SlugFormInput;
