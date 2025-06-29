import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const ShipConstructions = () => {
  UseTitleName("Ship Constructions | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const shipConstructionsPosts = articles.filter(post => post.category === "Ship Constructions").sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={shipConstructionsPosts} />
    </div>
  );
}

export default ShipConstructions;