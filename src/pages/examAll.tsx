import React, { useEffect,useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { format } from "date-fns";
import * as df from "date-fns";
import { Exam } from "../ts/Exam";

const ExamAll = () => {
  const queryClient = useQueryClient();

  const fetchExams = async () => {
    const response = await axios.get("https://back-mongo-task2.vercel.app/api/v1/exams/");
    return response.data;
  };

  const deleteExam = async (id: string) => {
    await axios.delete(`https://back-mongo-task2.vercel.app/api/v1/exams/${id}`);
  };

  const { data: exams = [] } = useQuery("exams", fetchExams);

  const [sortedExams, setSortedExams] = useState([]);
  useEffect(() => {
    // examsをcreated_atプロパティで降順ソート
    const sorted = exams.sort((a: Exam, b: Exam) => {
      return df.compareAsc(new Date(b.created_at), new Date(a.created_at));
    });
    setSortedExams(sorted);
  }, [exams]);

  const queryKey = "exams";
  const mutation = useMutation(deleteExam, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutateAsync(id);
  };

  const handleRandomDelete = async () => {
    // ランダムな60件の試験結果を取得
    const randomizedExams = exams.slice().sort(() => Math.random() - 0.5);
    const randomExams = randomizedExams.slice(0, 60);

    // 削除処理を実行
    for (const exam of randomExams) {
      await mutation.mutateAsync(exam._id);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-lime-500 border-b border-green-700">試験結果一覧</h2>
      <button className="btn btn-error" onClick={handleRandomDelete}>大量ランダム削除</button>
      {sortedExams && sortedExams.length === 0 ? (
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
            {sortedExams.map((exam: Exam) => (
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
