import React from "react";
import Modal from "react-modal";

type ModalContentProps = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContent = ({ setModalIsOpen }: ModalContentProps) => {
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="bg-slate-500">
      <div
        id="pop"
        className="flex h-full w-full justify-center items-center bg-white p-4 rounded-lg shadow-md"
      >
        <form className="w-full sm:w-4/5 lg:w-3/4 max-w-md">
          <h3 className="text-lg font-bold text-center mb-4">ID:334444</h3>
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
              defaultValue="島田"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="progress"
            >
              進捗
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="progress"
              type="text"
              placeholder="進捗を入力してください"
              defaultValue="未完了"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
              編集する
            </button>
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