import React, { useEffect } from "react";

const TsOne = () => {
  const obj = { a: 1, b: 2, c: 3 };
  const keys2 = Object.keys(obj);

  //typeof関数
  const point = { x: 135, y: 35 };
  type Point = typeof point;

  //リテラル型
  let only1: 1;
  only1 = 1;

  //ユニオン型
  let numberOrString: number | string;
  numberOrString = 3;
  console.log(numberOrString);
  numberOrString = "小早川";
  console.log(numberOrString);

  //ユニオン型の配列
  // ダメな例です、この場合、string型もしくはnumberの配列の型とはんだんされてしまいます。type List = string | number[];
  type Listanimal = (string | number)[];

  //ユニオン型の絞り込み
  useEffect(() => {
    // localStorage を使用するコードをここに書く
    localStorage.setItem("access_yn", "私の名前をローカルストレージに");
    const maybeUserId: string | null = localStorage.getItem("access_yn");
    let userId: string | undefined;
    if (typeof maybeUserId === "string") {
      userId = maybeUserId;
    }
    console.log(userId); // ブロック内での代入が行われた場合に、userId の値が出力されます
  }, []);

  return (
    <>
      <ul>
        <li>typeof型演算子</li>
        <li>リテラル型で特定の値だけを格納できるようにする</li>
        <li>
          ユニオン型で一つの変数に複数の型を持たせることができるようにする
        </li>
        <li>ユニオン型</li>
      </ul>
    </>
  );
};

export default TsOne;
