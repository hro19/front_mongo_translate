import React, { useState } from "react";
import Modal from "react-modal";
import TaskEdit from "./TaskEdit";

type ModalContentProps = {
  tasks: any;
  task: any;
  setTasks: any;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContent = ({ task,tasks,setTasks, setModalIsOpen }: ModalContentProps) => {
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [completed, setCompleted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.value === "completed");
  };

  return (
    <div className="bg-slate-500">
      <div
        id="pop"
        className="flex h-full w-full justify-center items-center bg-white p-4 rounded-lg shadow-md"
      >
        <form className="w-full sm:w-4/5 lg:w-3/4 max-w-md">
          <h3 className="text-lg font-bold text-center mb-4">
            【ID】{task._id}
          </h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              名前
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="名前を入力してください"
              defaultValue={task.name}
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
          <div className="flex justify-end space-x-2">
            <TaskEdit tasks={tasks} task={task} setTasks={setTasks} />
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-4 rounded"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalContent;
