import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  checkboxes: string[];
};

const CheckboxForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <input
            type="checkbox"
            value="動詞"
            {...register("checkboxes", {
              required: "少なくとも1つの項目を選択してください",
            })}
          />
          動詞
        </label>
        <label>
          <input
            type="checkbox"
            value="形容詞"
            {...register("checkboxes", {
              required: "少なくとも1つの項目を選択してください",
            })}
          />
          形容詞
        </label>
        <label>
          <input
            type="checkbox"
            value="副詞"
            {...register("checkboxes", {
              required: "少なくとも1つの項目を選択してください",
            })}
          />
          副詞
        </label>
        <label>
          <input
            type="checkbox"
            value="助動詞"
            {...register("checkboxes", {
              required: "少なくとも1つの項目を選択してください",
            })}
          />
          助動詞
        </label>
      </div>
      {errors.checkboxes && (
        <span className="text-red-500">{errors.checkboxes.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckboxForm;
