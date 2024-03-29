import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { searchFunc } from "../components/translates/Kensaku";
import {Translate} from "../ts/Translate"

interface Post {
  _id: string;
  enContent: string;
  jaContent: string;
}

const Search2 = () => {
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState<Translate[]>([]);
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

const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
  setShowPosts(searchFunc({ value: e.target.value, posts }));
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
      {showPosts.map((post: Post) => (
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
