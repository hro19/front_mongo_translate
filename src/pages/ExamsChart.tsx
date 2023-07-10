import React from "react";
import { useAtom } from "jotai";
import { examDataAtom } from "../jotai/examsAtoms";
import PureCom from "../components/exam/PureCom";

const ExamsChart = () => {
  const [examData, setExamData] = useAtom(examDataAtom);

  return (
    <div>
      {examData.map((data) => (
        <div key={data.id}>
          <h2 className="text-2xl text-sky-700">【英単語】{data.name}</h2>
          <p className="text-sm text-sky-900">
            【最新の正答率】 {data.correctRate.toFixed(2)}%
          </p>
          <ul>
            <PureCom exams={data.exams} />
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExamsChart;
