import React from "react";
import axios from "axios";

const TranslateDelete = ({ translate }: { translate: any }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://back-mongo-translate.vercel.app/api/v1/translates/${translate._id}`
      );
      console.log("Data deleted:", response.data);
      // データの削除後の処理を記述する
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md mt-2"
      onClick={handleDelete}
    >
      削除
    </button>
  );
};

export default TranslateDelete;
