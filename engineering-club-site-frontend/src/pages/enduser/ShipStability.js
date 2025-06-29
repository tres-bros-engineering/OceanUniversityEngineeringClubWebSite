import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const ShipStability = () => {
  UseTitleName("Ship Stability | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const shipStabilityPosts = articles.filter(post => post.category === "Ship Stability").sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={shipStabilityPosts} />
    </div>
  );
}

export default ShipStability;
