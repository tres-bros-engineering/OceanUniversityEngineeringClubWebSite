import UseTitleName from "../../utils/UseTitleName";
import PaginationPostGrid from "../../components/post grid/PaginationPostGrid";
import { useData } from "../../utils/DataContext";

const AllArticles = () => {
  const { articles } = useData();
  UseTitleName("All Articles");

  // Filter posts by category
  const allArticles = articles.filter(post => post.publish).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <PaginationPostGrid posts={allArticles} styleType={"post-grid"} />
    </>
  );
}

export default AllArticles;