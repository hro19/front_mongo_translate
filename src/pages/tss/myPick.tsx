import React from 'react'

type Todo = {
  title: string;
  description: string;
  completed: boolean;
}

type Todo2 = Omit<Todo, "description">;

type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};

type Todo3 = MyPick<Todo, "title" | "completed">;

type Todo4 = Pick<Todo, "title"|"description">;


const todo:Todo = {
  title: "晴れるといいな",
  description: "今日のお天気をラジオで聞きました、すると",
  completed: false,
};

const todo2:Todo2 = {
  title: "くもりはつらい",
  completed: false,
};

const todo3: Todo3 = {
  title: "雨が降ることも想定される",
  completed: true,
};

const todo4:Todo4 = {
  title: "雪が降ることも想定される",
  description: "明日の映画情報はシアターページから確認をしよう",
};


const MyPick = () => {
  return (
    <div>
      <h2 className="decoration-slate-800 text-2xl text-lime-400">
        普通に型定義をして表示
      </h2>
      <p>{todo.title}</p>
      <p>{todo.description}</p>
      <p>{todo.completed.toString()}</p>
      <hr />
      <h2 className="decoration-slate-800 text-2xl text-lime-400">Omitを使って型定義</h2>
      <p>{todo2.title}</p>
      <p>{todo2.completed.toString()}</p>
      <hr />
      <h2 className="decoration-slate-800 text-2xl text-lime-400">
        extendsを使って、MyPickを定義して
      </h2>
      <p>{todo3.title}</p>
      <p>{todo3.completed.toString()}</p>
      <hr />
      <h2 className="decoration-slate-800 text-2xl text-lime-400">
        既存のPickを使って定義
      </h2>
      <p>{todo4.title}</p>
      <p>{todo4.description}</p>
    </div>
  );
};

export default MyPick;
