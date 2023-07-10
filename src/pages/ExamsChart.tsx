import React, { useState, useEffect } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const studyDataList = [
  {
    date: "10/01",
    問題数: 120,
    正解数: 105,
    正解率: 88,
  },
  {
    date: "10/02",
    問題数: 130,
    正解数: 110,
    正解率: 85,
  },
  {
    date: "10/19",
    問題数: 100,
    正解数: 90,
    正解率: 90,
  },
];

const ExamsChart = () => {
  const [chartWidth, setChartWidth] = useState(() => {
    return window.innerWidth <= 700 ? window.innerWidth * 0.85 : 700;
  });

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth <= 700 ? window.innerWidth * 0.85 : 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <LineChart
        width={chartWidth}
        height={300}
        data={studyDataList}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="問題数" />
        <Line type="monotone" dataKey="問題数" stroke="#8884d8" />
        <Line type="monotone" dataKey="正解数" stroke="#3ba2f6" />
        <Line type="monotone" dataKey="正解率" stroke="#ff0092" />
        <Legend />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default ExamsChart;
