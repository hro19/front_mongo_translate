import React from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { TranslateObj } from "../../ts/Translate";
import { AiOutlineDelete } from "react-icons/ai";

const TranslateDelete = ({ translate }: TranslateObj) => {
  const queryClient = useQueryClient();

  const deleteTranslate = async () => {
    const response = await axios.delete(
      `https://back-mongo-translate.vercel.app/api/v1/translates/${translate._id}`
    );
    return response.data;
  };

  const mutation = useMutation(deleteTranslate, {
    onSuccess: () => {
      queryClient.refetchQueries("translates"); // "translates" クエリを最新に更新
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md mt-2"
      onClick={handleDelete}
    >
      <AiOutlineDelete
        className="icon text-white my-1 mx-2 inline-block"
        size="1.4rem"
      />
    </button>
  );
};

export default TranslateDelete;
