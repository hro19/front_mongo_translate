import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAtom } from "jotai";
import { isSnakeAtom } from "../../jotai/atoms";
import { useMutation, useQueryClient } from "react-query";
import SlugFormInput from "./SlugFormInput";
import { SecCount } from "../../components/taskShingle/Atarashiku";
import SnakeMessage from "../../components/taskShingle/SnakeMessage";

const SlugForm = ({ task, slug }: any) => {
  //popoverメッセージを制御する
  const [isSnake, setIsSnake] = useAtom(isSnakeAtom);
  const snakeDuration:number = 2000;

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
        // 更新成功の場合は、ポップオーバーで知らせる
        setIsSnake(true);
        SecCount(snakeDuration, setIsSnake);
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
    <div className="bg-slate-300 flex justify-center py-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SlugFormInput task={task} control={control} errors={errors} />
      </form>
      {isSnake && <SnakeMessage />}
    </div>
  );
};

export default SlugForm;
