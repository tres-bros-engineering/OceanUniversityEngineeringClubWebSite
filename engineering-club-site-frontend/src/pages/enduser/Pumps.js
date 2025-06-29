import UseTitleName from "../../utils/UseTitleName";
import { useData } from "../../utils/DataContext";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const Pumps = () => {
  UseTitleName("Pumps | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const pumpsPosts = articles.filter(post => post.category === "Pumps").sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={pumpsPosts} />
    </div>
  );
}

export default Pumps;