import axios from "axios";
import { Exam } from "@/ts/Exam";

export const getExams = async (_id: string): Promise<Exam[]> => {
  const response = await axios.get(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${_id}/exams`
  );
  const exams = response.data;

  return exams;
};
