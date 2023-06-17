import React from "react";
import { useForm, Controller } from "react-hook-form";

const MyForm = () => {
  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data:any) => {
    // フォームの送信処理
    console.log(data);

    // 送信後に送信データをデフォルト値としてセットする
    reset(data);
  };

  const isFormDirty = formState.isDirty;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          名前
        </label>
        <Controller
          control={control}
          name="name"
          rules={{ required: "名前は必須です" }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="name"
              className={`border rounded-lg py-2 px-3 w-full ${
                formState.errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {formState.errors.name && (
          <span className="text-red-500">{formState.errors.name.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          メールアドレス
        </label>
        <Controller
          control={control}
          name="email"
          rules={{ required: "メールアドレスは必須です" }}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              id="email"
              className={`border rounded-lg py-2 px-3 w-full ${
                formState.errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {formState.errors.email && (
          <span className="text-red-500">{formState.errors.email.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormDirty}
        className={`py-2 px-4 rounded font-bold text-white ${
          isFormDirty
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        送信
      </button>
    </form>
  );
};

export default MyForm;
