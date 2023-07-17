import { format } from "date-fns";

// 2023/07/17 22:06:41
export const dateUntilByou = (created_at: Date) =>
  format(new Date(created_at), "yyyy/MM/dd HH:mm:ss");

// 2023/07/17 22:06
export const dateUntilFun = (created_at: Date) =>
  format(new Date(created_at), "yyyy/MM/dd HH:mm");

// 2023/07/17 22
export const dateUntilZi = (created_at: Date) =>
  format(new Date(created_at), "yyyy/MM/dd HH");

// 23年07月17日
export const dateUntilDayJap = (created_at: Date) => format(new Date(created_at), "yy年M月d日");

// 07/17
export const dateMonthDay = (created_at: Date) =>
  format(new Date(created_at), "MM/dd");

// 2023/07
export const dateUntilMonth = (created_at: Date) => format(new Date(created_at), "yyyy/MM");

// 2023
export const dateYear = (created_at: Date) => format(new Date(created_at), "yyyy");
