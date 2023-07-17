import axios from "axios";
import { Exam } from "@/ts/Exam";

export const getExams = async (_id: string): Promise<Exam[]> => {
  const response = await axios.get(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${_id}/exams`
  );
  const exams = response.data;

  return exams;
};

// DBに保存するためにAPIにpost送信する
export const createExam = async (
  newData: Pick<Exam, "taskId" | "isCorrect">
): Promise<void> => {
  try {
    const response = await axios.post(
      "https://back-mongo-task2.vercel.app/api/v1/exams/",
      newData
    );

    // 成功した場合の処理を記述
  } catch (error: any) {
    console.log(error.message);
    // エラー時の処理を記述
  }
};
