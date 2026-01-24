import UseTitleName from "../../utils/UseTitleName";
import PaginationPostGrid from "../../components/post grid/PaginationPostGrid";
import { useData } from "../../utils/DataContext";
import { useParams } from "react-router-dom";

const ArticleCategory = () => {
  const { articles, category } = useData();
  const { categorySlug } = useParams();

  const c = category.find((c) => c.name.toLowerCase().trim().replace(/\s+/g, "-") === categorySlug)

  UseTitleName(c?.name);

  // Filter posts by category
  const categoryPost = articles.filter(post => post.category === c.name && post.publish).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <PaginationPostGrid posts={categoryPost} styleType={"post-grid"} />
    </>
  );
}

export default ArticleCategory;