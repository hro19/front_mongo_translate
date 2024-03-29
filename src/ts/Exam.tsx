import { Task } from "../ts/Task";

export type Result = Task & {
  isCorrect: boolean;
};

export type Gamen = "default" | "question" | "answer" | "finish";

export type Exam = {
  _id: string;
  taskId: string;
  isCorrect: boolean;
  created_at: Date;
};

export type ExamsWithRate = Exam & {
  dailyRate: number;
};

export type Chart = Pick<Task, "name" | "jaName"> &
  Pick<Exam, "taskId"> & {
    totalCount: number;
    totalCorrectCount: number;
    correctRate: number;
    examsWithRates: ExamsWithRate[];
  };