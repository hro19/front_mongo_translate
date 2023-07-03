import React from "react";

const SwitchAnswer = ({ onClick }: any) => {

  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="btn btn-outline btn-primary mt-4 mb-4 justify-end"
      >
        次の問題へ
      </button>
    </div>
  );
};

export default SwitchAnswer;
