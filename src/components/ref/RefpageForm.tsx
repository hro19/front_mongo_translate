import React, { useRef } from "react";

const RefpageForm = ({ handleSubmit }: any) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <form className="space-y-4">
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
          type="button"
          onClick={() =>
            handleSubmit(nameRef.current?.value, contentRef.current?.value)
          }
          className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          送信
        </button>
      </form>
    </>
  );
};

export default RefpageForm;
