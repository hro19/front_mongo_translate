import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { format } from "date-fns";
import ExamsChart from "./ExamsChart";
import { useAtom } from "jotai";
import { examDataAtom } from "../jotai/examsAtoms";
import { Exam } from "../ts/Exam";

const IdExams = () => {
  const results = [
    { id: "649ee23af35c07578a186814", name: "fear", jaName: "恐怖する" },
    {
      id: "648f04e7d01e7ef14aea4e8f",
      name: "dispatch",
      jaName: "(…へ)発送する、特派する",
    },
    { id: "648280313e790e70e4646db4", name: "fall", jaName: "落ちる、転ぶ" },
    { id: "649aa99815ca83cdb2ccba0b", name: "rise", jaName: "上がる" },
    { id: "64a41b8fb1ec37f082321984", name: "meet", jaName: "会う" },
  ];

  const fetchTaskExams = async (id:string) => {
    const response = await axios.get(
      `https://back-mongo-task2.vercel.app/api/v1/tasks/${id}/exams`
    );
    const exams = response.data;

    const totalCount:number = exams.length;
    const totalCorrectCount: number = exams.filter((exam: Exam) => exam.isCorrect).length;
    const correctRate: number = (totalCorrectCount / totalCount) * 100;

    return {
      taskId:id,
      exams,
      totalCount,
      totalCorrectCount,
      correctRate,
    };
  };

    const [examData, setExamData] = useAtom(examDataAtom);

  useEffect(() => {
    const fetchData = async () => {
      const promises = results.map(async (result) => {
        const taskExam = await fetchTaskExams(result.id);

        // examsWithRate、examsとdailyRateを合わせたもの
        const examsWithRate = taskExam.exams.map((exam: Exam, index: number) => {
          const correctCount = taskExam.exams
            .slice(0, index + 1)
            .filter((e: Exam) => e.isCorrect).length;
          const dailyRate = (correctCount / (index + 1)) * 100;
          return { ...exam, dailyRate };
        });
        return {
          ...taskExam,
          name: result.name,
          jaName: result.jaName,
          exams: examsWithRate,
        };
      });
      const taskExams = await Promise.all(promises);
      setExamData(taskExams);
    };

    fetchData();
  }, []);

  if (examData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {examData.map((data) => (
        <div key={data.id}>
          <h2 className="text-2xl text-sky-700">
            【英単語】{data.name}
            {/* {data.taskId} */}
          </h2>
          <div className="flex flex-row text-sm text-sky-900 gap-8">
            <p>【最新の正答率】 {data.correctRate.toFixed(2)}%</p>
            <p>テストの回数:{data.totalCount}</p>
            <p>テストの正解回数:{data.totalCorrectCount}</p>
          </div>
          <ul>
            <ExamsChart exams={data.exams} />
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IdExams;
