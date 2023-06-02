import React from 'react';

const TsOne = () => {

  const obj = { a: 1, b: 2, c: 3 };
  const keys2 = Object.keys(obj);

  const point = { x: 135, y: 35 };
  type Point = typeof point;


  
  return (
    <>
      <ul>
        <li>リンゴ</li>
        <li>
          <h2>typeof型演算子</h2>
          <p>
            TypeScriptのtypeofは変数から型を抽出する型演算子です。
            <br />
            例:変数pointにtypeof型演算子を用いて、Point型を定義できます。
          </p>
        </li>
        <li>ぶどう</li>
      </ul>
    </>
  );
};

export default TsOne;