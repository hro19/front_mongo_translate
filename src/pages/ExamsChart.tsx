import React from "react";
import { format } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const ExamsChart = ({ exams }: any) => {
  if (!exams || exams.length === 0) {
    return <div>No data available</div>;
  }

  const data = exams.map((exam: any) => ({
    date: format(new Date(exam.created_at), "yy年M月d日"),
    正解率: exam.dailyRate, // dailyRateを正解率として使用
  }));

  return (
    <div className="container mx-auto" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 45,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="正解率"
            strokeWidth={2} // 線の太さを調整
            stroke="#34A853" // 線の色を緑色に設定
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExamsChart;
