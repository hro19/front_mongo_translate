import React from "react";
import axios from "axios";

const TranslateCreate = ({
  jaContent,
  enContent,
}: {
  jaContent: any;
  enContent: any;
}) => {
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://back-mongo-translate.vercel.app/api/v1/translates",
        { jaContent, enContent }
      );
      console.log("Data created:", response.data);
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  return <button onClick={handleCreate}>データ登録</button>;
};

export default TranslateCreate;
