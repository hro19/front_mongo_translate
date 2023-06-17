import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useAtom } from "jotai";
import { isSnakeAtom } from "../../jotai/atoms";
import { useMutation, useQueryClient } from "react-query";

const SlugForm = ({ task,slug }: any) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("name", task.name);
    setValue("jaName", task.jaName);
    setValue("completed", task.completed);
  }, [task]);

  const mutation = useMutation(
    (data) =>
      axios.patch(
        `https://back-mongo-task2.vercel.app/api/v1/tasks/${task._id}`,
        data
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["task", slug]);
      },
    }
  );

  const onSubmit = async (data: any) => {
    try {
      await mutation.mutateAsync(data);
      // Handle successful form submission
      console.log("Form submitted successfully");
      // 更新されたデータを再フェッチ
      queryClient.invalidateQueries("tasks");
    } catch (error) {
      // Handle error
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-slate-300">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">名前</label>
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
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
            )}
          />
          {errors.name && (
            <span className="text-danger">
              {errors.name.message as React.ReactNode}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="jaName">日本語訳</label>
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
                className={`form-control ${errors.jaName ? "is-invalid" : ""}`}
              />
            )}
          />
          {errors.jaName && (
            <span className="text-danger">
              {errors.jaName.message as React.ReactNode}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="completed">
            <Controller
              control={control}
              name="completed"
              defaultValue={task.completed}
              render={({ field }) => (
                <input
                  {...field}
                  id="completed"
                  type="checkbox"
                  className="mr-1"
                />
              )}
            />
            暗記済み
          </label>
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default SlugForm;
