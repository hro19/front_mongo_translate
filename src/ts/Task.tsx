export type Task = {
  _id: string;
  name: string;
  completed: boolean;
};

export type TaskObj = {
  task: Task;
};

export type TaskIterateObj = {
  tasks?: Task[];
};

export type FormData = {
  name: string;
  completed: boolean;
};