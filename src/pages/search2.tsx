import React, { useState, useEffect } from "react";
import axios from "axios";

const Search2 = () => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("https://back-mongo-translate.vercel.app/api/v1/translates")
      .then((response) => {
        setPosts(response.data);
        setShowPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };

  const search = (value:any) => {
    // 検索欄への入力が空の場合は全ての投稿を表示する
    if (value === "") {
      setShowPosts(posts);
      return;
    }

    const searchedPosts = posts.filter((post) =>
      Object.values(post).some((item) => {
        if (item === undefined || item === null) {
          return false;
        }
        const strItem = item.toString();
        return strItem.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      })
    );

    setShowPosts(searchedPosts);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-[400px] placeholder-gray-400"
      />
      {showPosts.map((post: any) => (
        <div key={post._id}>
          <p>{post.enContent}</p>
          <p>{post.jaContent}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Search2;
