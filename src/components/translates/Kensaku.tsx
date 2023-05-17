import { Dispatch, SetStateAction } from "react";

interface Translate {
  _id: string;
  enContent: string;
  jaContent: string;
  created_at: string;
}

//検索文字に対応したコンテンツをフィルター
  const searchFunc = ({
    value,
    posts,
    setShowPosts,
  }: {
    value: string;
    posts: Translate[];
    setShowPosts: React.Dispatch<React.SetStateAction<Translate[]>>;
  }) => {
    // postsが存在する場合はフィルタリングを行う
    if (posts) {
      // 検索欄への入力が空の場合は全ての投稿を表示する
      if (value === "") {
        setShowPosts(posts);
        return;
      }

      const searchedPosts = posts.filter((post: Translate) =>
        Object.values(post).some((item) => {
          if (item === undefined || item === null) {
            return false;
          }
          const strItem = item.toString();
          return strItem.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        })
      );

      setShowPosts(searchedPosts);
    } else {
      // postsが存在しない場合は全件表示
      setShowPosts([]);
    }
  };

export { searchFunc };
