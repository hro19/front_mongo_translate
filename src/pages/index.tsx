import React from "react";
import Link from "next/link";

const DaisyUI = () => {
  return (
    <div className="mx-2">
      <Link href="/exam" className="btn mb-2 bg-primary text-white">英単語テスト</Link>
      <Link href="/tasks" className="btn mb-2 bg-secondary text-white">英単語登録</Link>
      <Link href="/translates" className="btn mb-2 bg-accent-focus text-white">英文暗記帳</Link>
    </div>
  );
};

export default DaisyUI;
