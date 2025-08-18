import UseTitleName from "../../utils/UseTitleName";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import { useData } from "../../utils/DataContext";

const Pumps = () => {
  UseTitleName("Pumps | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const pumpsPosts = articles.filter(post => post.category === "Pumps" && post.publish).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <PostGrid2 posts={pumpsPosts} />
    </>
  );
}

export default Pumps;