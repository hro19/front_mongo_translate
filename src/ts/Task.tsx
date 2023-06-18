export type Task = {
  _id: string;
  completed: boolean;
} & Record<string, string>;

export type TaskObj = {
  task: Task;
};

export type CurrentTaskObj = {
  currentTask: Task;
};

export type TaskIterateObj = {
  tasks?: Task[];
};
export type FormData = {
  completed: boolean;
} & Record<string, string>;

export type FormDataName = Record<string, string>;

export type SelectSwitch = "uncompleted" | "completed" | "all";
