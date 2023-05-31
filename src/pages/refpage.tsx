import React from "react";
import RefpageForm from "../components/ref/RefpageForm";

const FormPage = () => {
  const handleSubmit = (name: string, content: string) => {
    console.log({ name, content });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-4xl text-pink-700 font-bold border-b-2 pb-2 mb-4">
        フォーム画面
      </h1>
      <form
        className="space-y-4"
      >
        <RefpageForm handleSubmit={handleSubmit} />
      </form>
    </div>
  );
};

export default FormPage;
