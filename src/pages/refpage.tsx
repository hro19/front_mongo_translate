import React, { useRef } from "react";

const FormPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = nameRef.current?.value;
    const content = contentRef.current?.value;
    console.log({ name, content });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-4xl text-pink-700 font-bold border-b-2 pb-2 mb-4">
        フォーム画面
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            名前
          </label>
          <div className="mt-1 rounded-md border border-gray-300">
            <input
              type="text"
              id="name"
              ref={nameRef}
              className="px-4 py-2 w-full focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            コンテンツ
          </label>
          <div className="mt-1 rounded-md border border-gray-300">
            <textarea
              id="content"
              ref={contentRef}
              className="px-4 py-2 w-full focus:outline-none focus:border-indigo-500 focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default FormPage;
