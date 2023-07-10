import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { format } from "date-fns";

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

    const totalCount = exams.length;
    const totalCorrectCount = exams.filter((exam:any) => exam.isCorrect).length;
    const correctRate = (totalCorrectCount / totalCount) * 100;

    return {
      id,
      exams,
      totalCount,
      totalCorrectCount,
      correctRate,
    };
  };

  const {
    data: taskExams,
    isLoading,
    isError,
  } = useQuery("taskExams", async () => {
    const promises = results.map(async (result) => {
      const taskExam = await fetchTaskExams(result.id);
      return { ...taskExam, name: result.name, jaName: result.jaName };
    });
    const taskExams = await Promise.all(promises);
    return taskExams;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <div>
      {taskExams &&
        taskExams.map((taskExam) => (
          <div key={taskExam.id}>
            <h3 className="text-xl text-orange-400">
              {taskExam.id}【{taskExam.name}】【{taskExam.jaName}】
            </h3>
            <p>Total Count: {taskExam.totalCount}</p>
            <p>Total Correct Count: {taskExam.totalCorrectCount}</p>
            <p>Correct Rate: {taskExam.correctRate}%</p>
            <ul>
              {taskExam.exams.map((exam: any) => (
                <li key={exam._id}>
                  【{format(new Date(exam.created_at), "yyyy年MM月dd日 HH時mm分ss秒")}】
                  {exam.isCorrect.toString()}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default IdExams;
