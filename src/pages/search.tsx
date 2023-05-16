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

const Search = () => {
  const [showPosts, setShowPosts] = useState(posts);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    performSearch(selectedCategories, value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedCategories(selectedValues);
    performSearch(selectedValues, inputValue);
  };

  const performSearch = (categories: string[], value: string) => {
    if (categories.includes("All") && value === "") {
      setShowPosts(posts);
      return;
    }

    const filteredPosts = posts.filter((post) => {
      if (categories.includes("All")) {
        return (
          post.title.toLowerCase().includes(value.toLowerCase()) ||
          post.category.some((cat) =>
            cat.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
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

      <div>
        <h4>Search</h4>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

export default Search;