import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import ExamsChart from "./ExamsChart";
import { Exam, ExamsWithRate, Chart } from "../ts/Exam";

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

    return exams;
  };

  //examsの各配列に試験ごとの正答率を加える
  const addDailyRateToExams = (exams: Exam[]): ExamsWithRate[] => {
    return exams.map((exam: Exam, index: number) => {
      const correctCount = exams
        .slice(0, index + 1)
        .filter((e: Exam) => e.isCorrect).length;
      const dailyRate = (correctCount / (index + 1)) * 100;
      return { ...exam, dailyRate };
    });
  };

  const { data: charts, isLoading } = useQuery("charts", async () => {
    const promises: Promise<Chart>[] = results.map(async (result) => {
      const exams = await taskIdFetching(result.id);

      // テストの回数を算出
      const totalCount = exams.length;

      // 正解回数を算出
      const totalCorrectCount = exams.filter((exam: Exam) => exam.isCorrect).length;

      // 正答率を算出
      const correctRate = (totalCorrectCount / totalCount) * 100;

      // examsWithRateはexamsとdailyRateを合わせたもの
      const examsWithRates: ExamsWithRate[] = addDailyRateToExams(exams);

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
    return taskExams;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center my-32">
        <RingLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="my-8">
        {charts && charts.map((chart: Chart) => (
          <div key={chart.taskId}>
            <h2 className="text-2xl text-sky-700">【英単語】{chart.name}</h2>
            <div className="flex flex-row text-sm text-sky-900 gap-6">
              <p>【最新の正答率】 {chart.correctRate.toFixed(2)}%</p>
              <p>試験回数:{chart.totalCount}</p>
              <p>試験の正解数:{chart.totalCorrectCount}</p>
            </div>
            <ExamsChart exams={chart.examsWithRates} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdExams;
