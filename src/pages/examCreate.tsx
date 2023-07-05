import React, { useState } from "react";
import axios from "axios";

const ExamCreate = () => {
  const [taskId, setTaskId] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const newData = {
        taskId,
        isCorrect,
      };

      const response = await axios.post(
        "https://back-mongo-task2.vercel.app/api/v1/exams/",
        newData
      );
      console.log(response.data); // レスポンスデータを表示

      // 成功した場合の処理を記述

      // リセット
      setTaskId("");
      setIsCorrect(false);
    } catch (error: any) {
      console.log(error.message);
      // エラー時の処理を記述
    }
  };

  const handleCheckboxChange = () => {
    setIsCorrect(!isCorrect);
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit} className="w-64 mx-auto">
        <div className="mb-4">
          <label htmlFor="taskId" className="block font-medium text-gray-700">
            Task ID:
          </label>
          <input
            type="text"
            id="taskId"
            className="form-input mt-1 block w-full border border-gray-300 rounded-lg text-lg"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="isCorrect" className="block font-medium text-gray-700">
            Is Correct:
          </label>
          <input
            type="checkbox"
            id="isCorrect"
            className="form-checkbox mt-1"
            checked={isCorrect}
            onChange={handleCheckboxChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          新規作成
        </button>
      </form>
    </div>
  );
};

export default ExamCreate;
