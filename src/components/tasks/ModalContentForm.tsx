import React, { useState, useEffect } from "react";
import { Task } from "../../ts/Task";
import { useAtom } from "jotai";
import { checkEditAtom, initialSpeechOptionsAtom } from "../../jotai/atoms";
import { CheckEditDisabled } from "../../components/taskShingle/Atarashiku";


//inputデータを取得し、送信用データを作る
//バリデード管理をする
//親コンポーネントから受け取った送信用のハンドラーをbuttonに設置

type ModalContentFormProps = {
  task: Task;
  closeModal: () => void;
  handleSubmit: any;
};

const ModalContentForm = ({task,closeModal,handleSubmit,}: ModalContentFormProps) => {
  const [initialSpeechOptions, setInitialSpeechOptions] = useAtom(
    initialSpeechOptionsAtom
  );

  const [name, setName] = useState<string>(task.name);
  const [jaName, setJaName] = useState<string>(task.jaName);
  const [speech, setSpeech] = useState<string>(task.speech);
  const [completed, setCompleted] = useState<boolean>(task.completed);

  const [checkEdit, setCheckEdit] = useAtom(checkEditAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.value === "completed");
  };

  //checkEdit関数　元データと現データが同じならば送信ボタンがDisableになる
  useEffect(() => {
    CheckEditDisabled(name, jaName, speech, completed, task, setCheckEdit);
  }, [{ name, jaName,speech, completed }]);

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
        <label className="block text-gray-700 font-bold mb-2" htmlFor="speech">
          品詞
        </label>
        <select
          className="select border border-gray-300 w-full max-w-xs"
          id="speech"
          defaultValue={task.speech}
          onChange={(e) => setSpeech(e.target.value)}
        >
          <option disabled value="">
            品詞を選択してください
          </option>
          {Object.entries(initialSpeechOptions).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <span className="block text-gray-700 font-bold mb-2">進捗</span>
        <div className="flex">
          <div className="flex items-center mr-4">
            <input
              className="mr-1"
              type="radio"
              id="inprogress"
              name="progress"
              value="inprogress"
              defaultChecked={!task.completed}
              onChange={handleChange}
            />
            <label htmlFor="inprogress">勉強中</label>
          </div>
          <div className="flex items-center">
            <input
              className="mr-1"
              type="radio"
              id="completed"
              name="progress"
              value="completed"
              defaultChecked={task.completed}
              onChange={handleChange}
            />
            <label htmlFor="completed">暗記済み</label>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded mr-3"
          onClick={() => closeModal()}
        >
          キャンセル
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e, { name, jaName, speech, completed })}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            checkEdit ? "" : "disabled bg-gray-300"
          }`}
          disabled={!checkEdit}
        >
          更新する
        </button>
      </div>
    </>
  );
};

export default ModalContentForm;
