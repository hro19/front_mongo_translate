import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import TaskCreateForm from "../../components/tasks/TaskCreateForm";
import { FormData } from "../../ts/Task";
import { resetCheckboxValue } from "../../components/tasks/FormMethods.tsx";

const TaskCreate = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      jaName: "",
      speech: "",
      completed: false,
    },
  });


  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(
    async (data: FormData) => {
      await axios.post(
        "https://back-mongo-task2.vercel.app/api/v1/tasks",
        data
      );
    },
    {
      onSuccess: () => {
        //タスクリストのデータが最新の状態に更新されます。
        queryClient.invalidateQueries("tasks");
        //react-hook-formの関数で、フォームの値を初期化
        reset();
        resetCheckboxValue("completed");
      },
    }
  );

  //タスク作成リクエストが発行されます;
  const onSubmit: SubmitHandler<FormData> = (data) => {
    createTaskMutation.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-8 bg-blue-50 border border-gray-300 rounded-lg p-4 flex flex-row items-center"
      >
        <TaskCreateForm control={control} errors={errors}  />
      </form>
    </div>
  );
};

export default TaskCreate;
