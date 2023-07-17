import React from "react";
import { useQuery } from "react-query";
import RingLoader from "react-spinners/RingLoader";
import ExamsChart from "./ExamsChart";
import { Exam, Chart, Result } from "../ts/Exam";
import { AnalyExams } from "@/class/AnalyExams";
import { getExams } from "@/api/exam/getExams";

const IdExams = () => {
  const results: Pick<Result, "_id" | "name" | "jaName">[] = [
    { _id: "649ee23af35c07578a186814", name: "fear", jaName: "恐怖する" },
    {
      _id: "648f04e7d01e7ef14aea4e8f",
      name: "dispatch",
      jaName: "(…へ)発送する、特派する",
    },
    { _id: "648280313e790e70e4646db4", name: "fall", jaName: "落ちる、転ぶ" },
    { _id: "649aa99815ca83cdb2ccba0b", name: "rise", jaName: "上がる" },
    { _id: "64ad9a9fc711e2b62c713a0a", name: "convince", jaName: "納得させる" },
  ];

  //チャート用のデータオブジェクトの配列をmapにて作成
  const promises: Promise<Chart>[] = results.map(async (result) => {
    const exams: Exam[] = await getExams(result._id);
    const analyExams: AnalyExams = new AnalyExams(exams);

    return {
      taskId: result._id,
      name: result.name,
      jaName: result.jaName,
      totalCount: analyExams.totalCount,
      totalCorrectCount: analyExams.totalCorrectCount,
      correctRate: analyExams.correctRate,
      examsWithRates: analyExams.examsWithRates,
    };
  });

  //フェッチング時のキャッシュ管理とローディング管理
  const { data: charts, isLoading } = useQuery("charts", async () => {
    const charts: Chart[] = await Promise.all(promises);
    return charts;
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
        {charts &&
          charts.map((chart: Chart) => (
            <div key={chart.taskId}>
              <h2 className="text-2xl text-sky-700">
                【{chart.name}】{chart.jaName}
              </h2>
              <div className="flex flex-row text-sm text-sky-900 gap-6">
                <p>【最新の正答率】 {chart.correctRate}%</p>
                <p>試験回数:{chart.totalCount}</p>
                <p>試験の正解数:{chart.totalCorrectCount}</p>
              </div>
              <ExamsChart examsWithRates={chart.examsWithRates} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default IdExams;
