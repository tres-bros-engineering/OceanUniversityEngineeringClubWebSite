// To Format the title and category as Pathname
const PostUrlFormat = (category, title) => {
  if (!category) {
    return "/news/" + title.toLowerCase().replace(/[^\p{L}\p{N}\s]+/gu, "").replace(/\s+/g, "-");
  } else {
    return (
      "/article/" +
      category.toLowerCase().replace(/\s+/g, "-") +
      "/" +
      title.toLowerCase().replace(/[^\p{L}\p{N}\s]+/gu, "").replace(/\s+/g, "-")
    );
  }
};

export default PostUrlFormat;
