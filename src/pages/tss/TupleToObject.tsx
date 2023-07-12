import React from 'react';

// const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tuple = ["tesla", "model 3", "model X", "model Y"];
tuple[1] = "new value";
console.log(tuple);

// tuple[1] = 87654321;
// console.log(tuple);

const textC:string = "あああああ";
// textC = "やややや";

const tuple2 = ["tesla", "model 3", "model X", "model Y"] as const;

// アサーションをすることで配列は読み取り専用（readonly）となります。従って下記の用に配列要素を変更することは不可能です。
// tuple2[1] = "new value";
// console.log(tuple2);

type TupleToObject<T extends readonly (string | symbol | number)[]> = {
  [P in T[number]]: P;
};

type Ans = TupleToObject<typeof tuple2>;

const ans:Ans = {
  "tesla": "tesla",
  "model 3": "model 3",
  "model X": "model X",
  "model Y": "model Y",
}; 

const TupleToObject = () => {
  return (
    <div>
      {Object.entries(ans).map(([key, value]) => (
        <div key={key}>
          <span>キー:{key} </span>
          <span>バリュー:{value}</span>
        </div>
      ))}
    </div>
  );
}

export default TupleToObject
