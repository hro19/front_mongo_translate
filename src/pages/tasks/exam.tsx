import React, { useState } from "react";

const Exam = () => {
    const [answers, setAnswers] = useState<string[]>([]);
    type Gamen = "default" | "question" | "answer" | "finish";
    const [gamen, setgamen] = useState<Gamen>("default");

  const changehandle = (value: string) => {
    setAnswers((prevAnswers) => [...prevAnswers, value]);
  };

  return (
    <div>
      <div>
        <h2>{}の意味は</h2>
        <ul>
          <li>
            <button onClick={() => changehandle("aaaa")}>aaaa</button>
          </li>
          <li>
            <button onClick={() => changehandle("nnnn")}>nnnn</button>
          </li>
          <li>
            <button onClick={() => changehandle("eeee")}>eeee</button>
          </li>
        </ul>
        {answers.map(answer=>answer)}
      </div>
    </div>
  );
};

export default Exam;
