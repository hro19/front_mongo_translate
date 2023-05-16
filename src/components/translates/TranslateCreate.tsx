import React, { useState } from "react";
import axios from "axios";

const TranslateCreate = ({
  jaContent,
  enContent,
  handleCreateSuccess,
}: {
  jaContent: string | null;
  enContent: string | null;
  handleCreateSuccess: () => void;
}) => {
  const [isCreating, setIsCreating] = useState(false); // データ登録中かどうかをトラッキングする状態

  const handleCreate = async () => {
    if (isCreating) {
      // データ登録中の場合は何もしない
      return;
    }

    try {
      setIsCreating(true); // データ登録中の状態にする

      const response = await axios.post(
        "https://back-mongo-translate.vercel.app/api/v1/translates",
        { jaContent, enContent }
      );
      console.log("Data created:", response.data);
      handleCreateSuccess();
    } catch (error) {
      console.error("Error creating data:", error);
    } finally {
      setIsCreating(false); // データ登録完了後、状態をリセットする
    }
  };

  return (
    <button
      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md mt-4 ml-2"
      onClick={handleCreate}
    >
      データ登録
    </button>
  );
};

export default TranslateCreate;
