export type Task = FormData & {
  _id: string;
};

export type FormData = {
  name: string;
  jaName: string;
  speech: string;
  completed: boolean;
};

export type TaskObj = {
  task: Task;
};

export type TaskIterateObj = {
  tasks?: Task[];
};

export type SelectSwitch = "uncompleted" | "completed" | "all";
