import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const idExams = () => {
  const results = [
    { id: "649ee23af35c07578a186814" },
    { id: "648f04e7d01e7ef14aea4e8f" },
    { id: "648280313e790e70e4646db4" },
    { id: "649aa99815ca83cdb2ccba0b" },
    { id: "64a41b8fb1ec37f082321984" },
  ];

  const fetchTaskExams = async (id:string) => {
    const response = await axios.get(
      `//back-mongo-task2.vercel.app/api/v1/tasks/${id}/exams`
    );
    return response.data;
  };

  const {
    data: taskExams,
    isLoading,
    isError,
  } = useQuery("taskExams", async () => {
    const promises = results.map((result) => fetchTaskExams(result.id));
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
        taskExams.map((taskExam, index) => (
          <div key={results[index].id}>
            <h3 className="text-xl text-orange-400">{results[index].id}</h3>
            <ul>
              {taskExam.map((exam: any) => (
                <li key={exam._id}>{exam.isCorrect.toString()}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default idExams;
