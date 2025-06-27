import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/db.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const ShipConstructions = () => {
  UseTitleName("Ship Constructions | OCU Engineering Club");

  // Filter posts by category
  const shipConstructionsPosts = posts.article.filter(post => post.category === "Ship Constructions").sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={shipConstructionsPosts} />
    </div>
  );
}

export default ShipConstructions;