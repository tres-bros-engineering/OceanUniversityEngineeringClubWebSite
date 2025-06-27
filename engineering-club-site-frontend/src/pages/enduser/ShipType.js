import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/db.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const ShipType = () => {
  UseTitleName("Ship Type | OCU Engineering Club");

  // Filter posts by category
  const shipTypePosts = posts.article.filter(post => post.category === "Ship Type").sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={shipTypePosts} />
    </div>
  );
}

export default ShipType;