const searchFunc = ({ value, posts, setShowPosts }:any) => {
  // 検索欄への入力が空の場合は全ての投稿を表示する
  if (value === "") {
    setShowPosts(posts);
    return;
  }

  const searchedPosts = posts.filter((post: any) =>
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

export { searchFunc };
