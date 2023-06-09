import React,{useState} from "react";
import { Task } from "../../ts/Task";

//inputデータを取得し、送信用データを作る
//バリデード管理をする
//親コンポーネントから受け取った送信用のハンドラーをbuttonに設置

type ModalContentFormProps = {
  task: Task;
  closeModal: () => void;
  handleSubmit: any;
};

const ModalContentForm = ({task,closeModal,handleSubmit,}: ModalContentFormProps) => {
  const [name, setName] = useState(task.name);
  const [jaName, setJaName] = useState(task.jaName);
  const [completed, setCompleted] = useState(task.completed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.value === "completed");
  };

  return (
    <>
      <h3 className="text-lg font-bold text-center mb-4">【ID】{task._id}</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          英単語
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="英単語を入力してください"
          defaultValue={task.name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="jaName">
          日本語訳
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="jaName"
          type="text"
          placeholder="日本語訳を入力してください"
          defaultValue={task.jaName}
          onChange={(e) => setJaName(e.target.value)}
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
            defaultChecked={!task.completed}
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
            defaultChecked={task.completed}
            onChange={handleChange}
          />
          <label htmlFor="completed">完了</label>
        </div>
      </div>
      <button
        type="button"
        className="bg-gray-500 text-white py-2 px-4 rounded mr-3"
        onClick={() => closeModal()}
      >
        キャンセル
      </button>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={(e) => handleSubmit(e, { name,jaName, completed })}
      >
        更新する
      </button>
    </>
  );
};

export default ModalContentForm;
