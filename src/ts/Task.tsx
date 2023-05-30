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
