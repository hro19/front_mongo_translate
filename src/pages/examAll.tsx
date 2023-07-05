import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const ExamAll = () => {
  const queryClient = useQueryClient();

  const fetchExams = async () => {
    const response = await axios.get("https://back-mongo-task2.vercel.app/api/v1/exams/");
    return response.data;
  };

  const deleteExam = async (id:string) => {
    await axios.delete(`https://back-mongo-task2.vercel.app/api/v1/exams/${id}`);
  };

  const { data: exams = [] } = useQuery("exams", fetchExams);

  const mutation = useMutation(deleteExam, {
    onSuccess: () => {
      queryClient.invalidateQueries("exams");
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div>
      <h2>Exam List</h2>
      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        <ul>
          {exams.map((exam:any) => (
            <li key={exam._id} className="my-2">
              <span className="mr-2">{exam._id}</span>
              <span className="mr-2">{exam.taskId}</span>
              <span className="mr-2">{exam.isCorrect.toString()}</span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(exam._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExamAll;
