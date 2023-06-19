export type Task = {
  _id: string;
  completed: boolean;
  name: string;
  jaName: string;
  speech: string;
};

export type TaskObj = {
  task: Task;
};

export type TaskIterateObj = {
  tasks?: Task[];
};

export type FormData = {
  name: string;
  jaName: string;
  speech: string;
  completed: boolean;
};

export type SelectSwitch = "uncompleted" | "completed" | "all";
