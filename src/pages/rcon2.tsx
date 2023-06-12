import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

const Rcon2 = () => {
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      text: "",
      speech: null,
    },
  });
  const { errors } = formState;

  const speechOptions:any = [
    { value: "verb", label: "動詞" },
    { value: "adjective", label: "形容詞" },
    { value: "adverb", label: "副詞" },
    { value: "preposition", label: "前置詞" },
    { value: "other", label: "その他" },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
    reset(); // フォームのリセット
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="text">テキスト</label>
        <Controller
          name="text"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} type="text" id="text" />}
        />
        {errors.text && <p>テキストの入力は必須です。</p>}
      </div>
      <div>
        <label htmlFor="speech">品詞</label>
        <Controller
          name="speech"
          control={control}
          rules={{ validate: (value) => !!value }}
          render={({ field }) => (
            <Select
              {...field}
              options={speechOptions}
              isMulti
              classNamePrefix="react-select"
              value={field.value || []}
              onChange={(selectedOptions) => field.onChange(selectedOptions)}
            />
          )}
        />
        {errors.speech && <p>少なくとも1つの選択が必要です。</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Rcon2;
