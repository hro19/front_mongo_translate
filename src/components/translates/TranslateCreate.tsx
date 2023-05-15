import React from "react";
import axios from "axios";

const TranslateCreate = ({
  jaContent,
  enContent,
  handleCreateSuccess,
}: {
  jaContent: any;
  enContent: any;
  handleCreateSuccess: any;
}) => {
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://back-mongo-translate.vercel.app/api/v1/translates",
        { jaContent, enContent }
      );
      console.log("Data created:", response.data);
      handleCreateSuccess();
    } catch (error) {
      console.error("Error creating data:", error);
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
