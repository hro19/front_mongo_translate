import React from "react";
import { useForm } from "react-hook-form";

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    // フォームの送信処理を実行する
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register("mySelect", { required: "このフィールドは必須です" })}
      >
        <option value="option1">オプション1</option>
        <option value="option2">オプション2</option>
        <option value="option3">オプション3</option>
      </select>
      {errors.mySelect && <p>{errors.mySelect.message as React.ReactNode}</p>}
      <button type="submit">送信</button>
    </form>
  );
}

export default MyForm;
