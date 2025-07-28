import UseTitleName from "../../utils/UseTitleName";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import { useData } from "../../utils/DataContext";

const ShipConstructions = () => {
  UseTitleName("Ship Constructions | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const shipConstructionsPosts = articles.filter(post => post.category === "Ship Constructions" && post.publish).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={shipConstructionsPosts} />
    </div>
  );
}

export default ShipConstructions;