
//条件分岐次第で型が変わる。
//第一引数 true/false
//第二引数 プリミティブ値またはリテラル値
//第三引数 プリミティブ値またはリテラル値

export type If<C extends boolean, T, F> = C extends true ? T : F;


//オブジェクトのvalueのユニオン型を作る
//第一引数 オブジェクト
export type valueOf<T> = T[keyof T];