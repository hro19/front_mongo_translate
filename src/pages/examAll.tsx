import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { format } from "date-fns";

const ExamAll = () => {
  const queryClient = useQueryClient();

  const fetchExams = async () => {
    const response = await axios.get("https://back-mongo-task2.vercel.app/api/v1/exams/");
    return response.data;
  };

  const deleteExam = async (id) => {
    await axios.delete(`https://back-mongo-task2.vercel.app/api/v1/exams/${id}`);
  };

  const { data: exams = [] } = useQuery("exams", fetchExams);

  const mutation = useMutation(deleteExam, {
    onSuccess: () => {
      queryClient.invalidateQueries("exams");
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div>
      <h2 className="text-3xl text-lime-500 border-b border-green-700">試験結果一覧</h2>
      {exams.length === 0 ? (
        <p>No exam results found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Created At</th>
              <th>Exam ID</th>
              <th>Task ID</th>
              <th>Is Correct</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam._id}>
                <td>{format(new Date(exam.created_at), "yyyy/MM/dd HH:mm:ss")}</td>
                <td>{exam._id}</td>
                <td>{exam.taskId}</td>
                <td>{exam.isCorrect.toString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(exam._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamAll;
