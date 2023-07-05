import { Task } from "../ts/Task";

export type Result = Task & {
  isCorrect: boolean;
};
