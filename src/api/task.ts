import axios from "axios";
import { Task } from "@/ts/Task";

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get("https://back-mongo-task2.vercel.app/api/v1/tasks");
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return [];
  }
};