import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { jaContentAtom, enContentAtom } from "../../jotai/translatesAtoms";

type TranslateCreateProps = {
  handleCreateSuccess: () => void;
};

const TranslateCreate = ({ handleCreateSuccess }: TranslateCreateProps) => {
  const [jaContent, setJaContent] = useAtom(jaContentAtom);
  const [enContent, setEnContent] = useAtom(enContentAtom);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (isCreating) {
      return;
    }

    try {
      setIsCreating(true);

      const response = await axios.post(
        "https://back-mongo-translate.vercel.app/api/v1/translates",
        { jaContent, enContent }
      );
      console.log("Data created:", response.data);
      handleCreateSuccess();
    } catch (error) {
      console.error("Error creating data:", error);
    } finally {
      setIsCreating(false);
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
