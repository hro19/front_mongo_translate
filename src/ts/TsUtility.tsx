
//条件分岐次第で型が変わる。
//第一引数 true/false
//第二引数 プリミティブ値またはリテラル値
//第三引数 プリミティブ値またはリテラル値

export type If<C extends boolean, T, F> = C extends true ? T : F;


//オブジェクトのvalueのユニオン型を作る
//第一引数 オブジェクト
export type ValueOf<T> = T[keyof T];

//与えられた文字列(ユニオン型)のkeyとvalueを持つオブジェクト
//第一引数 ユニオン型
export type MappedConst<T extends string> = {
  [key in T]: key;
};