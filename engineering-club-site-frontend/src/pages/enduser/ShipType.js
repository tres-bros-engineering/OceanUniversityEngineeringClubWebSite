import UseTitleName from "../../utils/UseTitleName";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import { useData } from "../../utils/DataContext";

const ShipType = () => {
  UseTitleName("Ship Type | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const shipTypePosts = articles.filter(post => post.category === "Ship Type" && post.publish).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <PostGrid2 posts={shipTypePosts} />
    </>
  );
}

export default ShipType;