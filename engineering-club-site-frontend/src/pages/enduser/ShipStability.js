import UseTitleName from "../../utils/UseTitleName";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import { useData } from "../../utils/DataContext";

const ShipStability = () => {
  UseTitleName("Ship Stability | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const shipStabilityPosts = articles.filter(post => post.category === "Ship Stability" && post.publish).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={shipStabilityPosts} />
    </div>
  );
}

export default ShipStability;
