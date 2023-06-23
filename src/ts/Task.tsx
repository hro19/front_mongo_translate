export type Task = {
  _id: string;
  jaName: string;
  name: string;
  speech: string;
  completed: boolean;
};

export type TaskObj = {
  task: Task;
};