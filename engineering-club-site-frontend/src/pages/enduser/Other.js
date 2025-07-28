import UseTitleName from "../../utils/UseTitleName";
import PostGrid2 from "../../components/enduser/post grid/PostGrid2";
import { useData } from "../../utils/DataContext";

const Other = () => {
  UseTitleName("Other | OCU Engineering Club");
  const { articles } = useData();

  // Filter posts by category
  const otherPosts = articles.filter(post => post.category === "Other" && post.publish).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <PostGrid2 posts={otherPosts} />
    </div>
  );
}

export default Other;
