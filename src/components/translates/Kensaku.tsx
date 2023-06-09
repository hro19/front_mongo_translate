import { Translate } from "../../ts/Translate";

//検索文字に対応したコンテンツをフィルター
const searchFunc = ({ value, posts, setShowPosts }: any) => {
  // postsが存在する場合はフィルタリングを行う
  if (posts) {
    // 検索欄への入力が空の場合は全ての投稿を表示する
    if (value === "") {
      setShowPosts(posts);
      return;
    }

    const searchedPosts = posts.filter((post: Translate) =>
      Object.values(post).some((item) => {
        if (typeof item !== "string" && typeof item !== "number") {
          return false;
        }
        const strItem = item.toString();
        return strItem.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      })
    );

    setShowPosts(searchedPosts);
  } else {
    // postsが存在しない場合は空の配列を返す
    setShowPosts([]);
  }
};

export { searchFunc };
