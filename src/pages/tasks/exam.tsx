import React, { useState } from "react";

const Exam = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  type Gamen = "default" | "question" | "answer" | "finish";
  const [gamen, setGamen] = useState<Gamen>("default");

  const changeHandle = (value: string) => {
    setAnswers((prevAnswers) => [...prevAnswers, value]);
    setGamen("answer");
  };

  return (
    <div>
      <div className="mx-auto max-w-[640px]">
        <h2>{}の意味は</h2>
        <ul className="flex flex-col justify-center">
          <li>
            <button
              className="btn mt-9 mb-2 w-full bg-primary text-white py-2 px-4 text-lg"
              onClick={() => changeHandle("aaaa")}
            >
              aaaa
            </button>
          </li>
          <li>
            <button
              className="btn mt-9 mb-2 w-full bg-primary text-white py-2 px-4 text-lg"
              onClick={() => changeHandle("nnnn")}
            >
              nnnn
            </button>
          </li>
          <li>
            <button
              className="btn mt-9 mb-2 w-full bg-primary text-white py-2 px-4 text-lg"
              onClick={() => changeHandle("eeee")}
            >
              eeee
            </button>
          </li>
        </ul>
        {answers.map((answer, index) => (
          <p key={index}>{answer}</p>
        ))}
        {gamen}
      </div>
    </div>
  );
};

export default Exam;
