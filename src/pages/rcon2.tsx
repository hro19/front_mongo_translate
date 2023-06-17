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
    <div className="mx-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="text" className="block text-gray-700">
            Text
          </label>
          <Controller
            name="text"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="text"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
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
                placeholder="品詞を選択してください"
                isMulti
                classNamePrefix="react-select"
                value={field.value || null}
                onChange={(selectedOptions) => field.onChange(selectedOptions)}
              />
            )}
          />
          {errors.speech && <p>少なくとも1つの選択が必要です。</p>}
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Rcon2;
