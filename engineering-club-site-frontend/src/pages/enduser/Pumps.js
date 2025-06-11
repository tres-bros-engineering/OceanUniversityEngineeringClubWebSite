import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/PostData.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const Pumps = () => {
  UseTitleName("Pumps | OCU Engineering Club");

  // Filter posts by category
  const pumpsPosts = posts.filter(post => post.category === "Pumps");

  return (
    <div>
      <PostGrid2 posts={pumpsPosts} />
    </div>
  );
}

export default Pumps;