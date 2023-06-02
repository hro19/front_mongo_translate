import React from "react";

// ●秒後に setIsSnake(false) を実行する
//第一引数 秒
//第二引数 ●秒後に行いたい処理

const SecCount = (
  second: number,
  setIsSnake: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setTimeout(() => {
    setIsSnake(false);
  }, second);
};

export { SecCount };
