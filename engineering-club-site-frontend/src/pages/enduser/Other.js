import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/PostData.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const Other = () => {
  UseTitleName("Other | OCU Engineering Club");

  // Filter posts by category
  const otherPosts = posts.filter(post => post.category === "Other");

  return (
    <div>
      <PostGrid2 posts={otherPosts} />
    </div>
  );
}

export default Other;
