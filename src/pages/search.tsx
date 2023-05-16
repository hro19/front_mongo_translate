import React, { useState } from 'react';

const posts = [
  {
    title: "useStateの使い方",
    category: ["React", "JavaScript", "TypeScript"],
  },
  {
    title: "LaravelのMVCモデルについて",
    category: ["React", "Laravel"],
  },
  {
    title: "同一オリジンポリシーとCORS",
    category: ["Web"],
  },
  {
    title: "useEffectの使い方",
    category: ["Laravel"],
  },
];

const search = () => {
  const [showPosts, setShowPosts] = useState(posts);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);

  // 検索欄への入力値をハンドリング
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    search(selectedCategories, value);
  };

  // カテゴリーの選択をハンドリング
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedCategories(selectedValues);
    search(selectedValues, inputValue);
  };

  // カテゴリーと入力値での絞り込み
  const search = (categories: string[], value: string) => {
    // カテゴリーが "All" で入力値が空の場合は全ての記事を表示
    if (categories.includes("All") && value === "") {
      setShowPosts(posts);
      return;
    }

    const filteredPosts = posts.filter((post) => {
      if (categories.includes("All")) {
        // カテゴリーが "All" の場合、入力値でのみ絞り込み
        return (
          post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.category.some((cat) =>
            cat.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        // カテゴリーが選択されている場合、カテゴリーと入力値の両方で絞り込み
        return (
          categories.some((cat) => post.category.includes(cat)) &&
          (post.title.toLowerCase().includes(value.toLowerCase()) ||
            post.category.some((cat) =>
              cat.toLowerCase().includes(value.toLowerCase())
            ))
        );
      }
    });

    setShowPosts(filteredPosts);
  };

  return (
    <div className="App">
      <h1>記事一覧</h1>

      {/* カテゴリー選択フォーム */}
      <div>
        <h4>カテゴリー</h4>
        <select
          value={selectedCategories}
          onChange={handleCategoryChange}
          multiple
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="React">React</option>
          <option value="Laravel">Laravel</option>
          <option value="Web">Web</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
        </select>
      </div>

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
            <p>category：{post.category.join(", ")}</p>
          </div>
        );
      })}
    </div>
  );
};

export default search;