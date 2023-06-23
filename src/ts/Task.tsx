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

export type TaskIterateObj = {
  tasks?: Task[];
};

export type FormData = Omit<Task, "_id">;


export type SelectSwitch = "uncompleted" | "completed" | "all";
