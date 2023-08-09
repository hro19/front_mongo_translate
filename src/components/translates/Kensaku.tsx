import { Translate } from "../../ts/Translate";

type SearchFuncType = (params: { value: string; posts: Translate[] }) => Translate[];

//検索文字に対応したコンテンツをフィルター
const searchFunc: SearchFuncType = ({ value, posts}) => {

  let searchedPosts: Translate[] = []; 

  // postsが存在する場合はフィルタリングを行う
  if (posts) {
    // 検索欄への入力が空の場合は全ての投稿を表示する
    if (value === "") {
      return (searchedPosts = posts);
    }

    searchedPosts = posts.filter((post: Translate) =>
      Object.values(post).some((item) => {
        if (typeof item !== "string" && typeof item !== "number") {
          return false;
        }
        const strItem = item.toString();
        return strItem.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      })
    );
  }
  return searchedPosts;
};

export { searchFunc };
