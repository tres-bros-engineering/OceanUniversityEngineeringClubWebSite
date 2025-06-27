import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/db.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const Other = () => {
  UseTitleName("Other | OCU Engineering Club");

  // Filter posts by category
  const otherPosts = posts.article.filter(post => post.category === "Other").sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={otherPosts} />
    </div>
  );
}

export default Other;
