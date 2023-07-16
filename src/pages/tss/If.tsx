import React, { useState } from "react";

type AAA = "Hello";
type BBB = "World";
type If<C extends boolean, T, F> = C extends true ? T : F;
type Result = If<boolean, AAA, BBB>;

const TypeChall = () => {
  const [isJadge, setIsJadge] = useState<boolean>(true);
  const [result, setResult] = useState<Result>("Hello");

  const handleToggle = () => {
    setIsJadge((prevIsJadge) => !prevIsJadge);
    setResult(isJadge ? "World" : "Hello");
  };

  return (
    <div>
      <div>{result}</div>
      <button className="btn btn-info" onClick={handleToggle}>
        切り替え
      </button>
    </div>
  );
};

export default TypeChall;
