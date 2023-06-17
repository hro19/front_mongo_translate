import React from 'react';
import { Controller } from "react-hook-form";

const SlugFormInput = ({task,control,errors}:any) => {
  return (
    <>
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
                checked={field.value} // フォームの値に応じてチェックを設定
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.checked)
                } // チェックボックスの状態をフォームの値に反映
              />
            )}
          />
          暗記済み
        </label>
      </div>
      <button type="submit">送信</button>
    </>
  );
}

export default SlugFormInput