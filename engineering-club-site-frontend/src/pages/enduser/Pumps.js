import UseTitleName from "../../utils/UseTitleName";
import posts from "../../data/db.json";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";

const Pumps = () => {
  UseTitleName("Pumps | OCU Engineering Club");

  // Filter posts by category
  const pumpsPosts = posts.article.filter(post => post.category === "Pumps").sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={pumpsPosts} />
    </div>
  );
}

export default Pumps;