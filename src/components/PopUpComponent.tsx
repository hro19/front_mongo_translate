import React, { memo, useEffect } from "react";

import { RxCross1 } from "react-icons/rx";

type Props = {
  viewFlag: boolean;
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopUpComponent = memo((props: Props) => {
  const { viewFlag, setViewFlag } = props;
  useEffect(() => {
    // 背景画面固定用関数
    const registerBackgroundFixed = () => {
      const body = document.body;
      const scrollWidth = window.innerWidth - body.clientWidth;
      body.style.marginRight = `${scrollWidth}px`;
      body.style.overflowY = "hidden";
    };
    // 背景画面固定解除用関数
    const unRegisterBackgroundFixed = () => {
      const body = document.body;
      body.style.overflowY = "";
      body.style.marginRight = "";
    };
    if (viewFlag) registerBackgroundFixed();

    return () => {
      unRegisterBackgroundFixed();
    };
  }, [viewFlag]);

  // 枠外クリック用関数
  const onClickBackground = () => {
    setViewFlag(false);
  };

  // 枠内クリック
  const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className={
          "fixed flex flex-col items-center justify-center overflow-hidden bg-gray-500/50 transition-all " +
          (viewFlag
            ? " top-0 left-0 h-screen w-screen "
            : " top-1/2 left-1/2 h-0 w-0 ")
        }
        onClick={onClickBackground}
      >
        <div className="relative h-3/4 w-3/4 max-w-3xl">
          {/* バツボタン */}
          <div className="absolute right-0 -top-10 h-10 w-10 hover:cursor-pointer">
            <RxCross1 className="h-full w-full" />
          </div>
          <div
            id="pop"
            className="flex h-full w-full justify-center items-center bg-white p-4 rounded-lg shadow-md"
          >
            <form className="w-full sm:w-4/5 lg:w-3/4 max-w-md">
              <h3 className="text-lg font-bold text-center mb-4">ID:334444</h3>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  名前
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="名前を入力してください"
                  defaultValue="島田"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="progress"
                >
                  進捗
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="progress"
                  type="text"
                  placeholder="進捗を入力してください"
                  defaultValue="未完了"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                  編集する
                </button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-4 rounded">
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});
