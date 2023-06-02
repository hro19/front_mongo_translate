import React, { ChangeEvent, FormEvent, Dispatch, SetStateAction } from "react";
import { Task } from "../../ts/Task";

type ShingleFormProps = {
  task: Task;
  name: string;
  completed: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const ShingleForm = ({task,name,completed,setName,setCompleted,handleSubmit}: ShingleFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.value === "completed");
  };

  return (
    <form className="w-full sm:w-4/5 lg:w-3/4 max-w-md" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold text-center mb-4">【ID】{task._id}</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          名前
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="お名前を入力してください"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <span className="block text-gray-700 font-bold mb-2">進捗</span>
        <div className="flex items-center">
          <input
            className="mr-2"
            type="radio"
            id="inprogress"
            name="progress"
            value="inprogress"
            checked={!completed}
            onChange={handleChange}
          />
          <label htmlFor="inprogress">進行中</label>
        </div>
        <div className="flex items-center">
          <input
            className="mr-2"
            type="radio"
            id="completed"
            name="progress"
            value="completed"
            checked={completed}
            onChange={handleChange}
          />
          <label htmlFor="completed">完了</label>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        更新する
      </button>
    </form>
  );
};

export default ShingleForm;
