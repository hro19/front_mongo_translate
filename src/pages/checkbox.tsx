import React from "react";
import { useForm } from "react-hook-form";

type Hinshi = {
  value: string;
  label: string;
};

type FormData = {
  checkboxes: string[];
};

const CheckboxForm = () => {
  const hinshi: Hinshi[] = [
    { value: "verb", label: "動詞" },
    { value: "adjective", label: "形容詞" },
    { value: "adverb", label: "副詞" },
    { value: "auxiliary", label: "助動詞" },
  ];

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
        {hinshi.map((checkbox) => (
          <label key={checkbox.value}>
            <input
              type="checkbox"
              value={checkbox.value}
              {...register("checkboxes", {
                required: "少なくとも1つの項目を選択してください",
              })}
            />
            {checkbox.label}
          </label>
        ))}
      </div>
      {errors.checkboxes && (
        <span className="text-red-500">{errors.checkboxes.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckboxForm;
