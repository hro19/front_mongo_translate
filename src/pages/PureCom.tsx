import React from "react";
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

const data = [
  {
    date: "23/07/01",
    正解率: 40,
  },
  {
    date: "23/07/02",
    正解率: 36,
  },
  {
    date: "23/07/03",
    正解率: 55,
  },
  {
    date: "23/07/04",
    正解率: 60,
  },
  {
    date: "23/07/05",
    正解率: 89,
  },
];

const ExamsChart = () => {
  return (
    <div className="container mx-auto" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 25,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="正解率" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExamsChart;
