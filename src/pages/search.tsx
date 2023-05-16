// 参考記事：Reactでリアルタイムの検索機能を実装する　https://qiita.com/hinako_n/items/a0745afe0631578c698e
import React, { useState } from 'react';

const posts = [
  {
    title: "useStateの使い方",
    category: "React",
  },
  {
    title: "LaravelのMVCモデルについて",
    category: "Laravel",
  },
  {
    title: "同一オリジンポリシーとCORS",
    category: "Web",
  },
  {
    title: "useEffectの使い方",
    category: "React",
  },
];

const search = () => {
  const [showPosts, setShowPosts] = useState(posts);
  const [inputValue, setInputValue] = useState();

  // 検索欄への入力値をハンドリング
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  // 検索欄への入力値での絞り込み
  const search = (value: any) => {
    // 検索欄への入力が空の場合は早期return
    if (value === "") {
      setShowPosts(posts);
      return;
    }

    const serchedPosts = posts.filter(
      (post) =>
        Object.values(post).filter(
          (item) =>
            item !== undefined &&
            item !== null &&
            item.toUpperCase().indexOf(value.toUpperCase()) !== -1
        ).length > 0
    );

    setShowPosts(serchedPosts);
  };

  return (
    <div className="App">
      <h1>記事一覧</h1>

      {/* フリーキーワード検索フォーム */}
      <div>
        <h4>Search</h4>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 記事一覧表示 */}
      {showPosts.map((post, index) => {
        return (
          <div key={post.title}>
            <p>
              {index + 1}. {post.title}
            </p>
            <p>category：{post.category}</p>
          </div>
        );
      })}
    </div>
  );
}

export default search
