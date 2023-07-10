import React, { useState, useEffect } from "react";
import axios from "axios";
import ExamsChart from "./ExamsChart";
import { useAtom } from "jotai";
import { examChartsAtom } from "../jotai/examsAtoms";
import { Exam, ExamsWithRate, ExamChart } from "../ts/Exam";

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

  const taskIdFetching = async (id: string) => {
    const response = await axios.get(
      `https://back-mongo-task2.vercel.app/api/v1/tasks/${id}/exams`
    );
    const exams = response.data;

    return {
      exams,
    };
  };

  const [examCharts, setExamCharts] = useAtom(examChartsAtom);

  useEffect(() => {
    const fetchData = async () => {
      const promises = results.map(async (result) => {
        const taskExams = await taskIdFetching(result.id);

        // テストの回数を算出
        const totalCount = taskExams.exams.length;

        // 正解回数を算出
        const totalCorrectCount = taskExams.exams.filter(
          (exam: Exam) => exam.isCorrect
        ).length;

        // 正答率を算出
        const correctRate = (totalCorrectCount / totalCount) * 100;

        // examsWithRateはexamsとdailyRateを合わせたもの
        const examsWithRates: ExamsWithRate[] = taskExams.exams.map(
          (exam: Exam, index: number) => {
            const correctCount = taskExams.exams
              .slice(0, index + 1)
              .filter((e: Exam) => e.isCorrect).length;
            const dailyRate = (correctCount / (index + 1)) * 100;
            return { ...exam, dailyRate };
          }
        );

        return {
          taskId: result.id,
          name: result.name,
          jaName: result.jaName,
          totalCount,
          totalCorrectCount,
          correctRate,
          examsWithRates,
        };
      });

      const taskExams = await Promise.all(promises);
      setExamCharts(taskExams);
    };

    fetchData();
  }, []);

  if (examCharts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {examCharts.map((chart: ExamChart) => (
        <div key={chart.taskId}>
          <h2 className="text-2xl text-sky-700">
            【英単語】{chart.name}
            {/* {data.taskId} */}
          </h2>
          <div className="flex flex-row text-sm text-sky-900 gap-8">
            <p>【最新の正答率】 {chart.correctRate.toFixed(2)}%</p>
            <p>テストの回数:{chart.totalCount}</p>
            <p>テストの正解回数:{chart.totalCorrectCount}</p>
          </div>
          <ul>
            <ExamsChart exams={chart.examsWithRates} />
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IdExams;
