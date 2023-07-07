import { Task } from "../ts/Task";

export type Result = Task & {
  isCorrect: boolean;
};

export type Gamen = "default" | "question" | "answer" | "finish";

export type ExamCreate = {
  taskId: string;
  isCorrect: boolean;
};

export type Exam = {
  _id: string;
  taskId: string;
  isCorrect: boolean;
  created_at: Date;
};