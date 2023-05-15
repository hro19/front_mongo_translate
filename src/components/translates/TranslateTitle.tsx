import React from "react";
import Link from "next/link";

const TranslateTitle = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center inline-block mr-6">
        DeepL辞書
      </h1>
      <span className="border border-yellow-500 text-2xl inline-block mr-2">
        <Link href="/translates" className="text-yellow-500">
          新規登録
        </Link>
      </span>
      <span className="border border-yellow-500 text-2xl inline-block mr-2">
        <Link href="/translates/all" className="text-yellow-500">
          翻訳データALL
        </Link>
      </span>
    </>
  );
}

export default TranslateTitle
