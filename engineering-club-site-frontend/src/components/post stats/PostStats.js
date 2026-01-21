// Views, Like and Dislike Component
import axios from "axios";
import { useEffect, useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";

const PostStats = ({ views, like, dislike, postId, category }) => {
  const { getNews, getArticle } = useData();

  const [viewCount, setViewCount] = useState(views);
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [userAction, setUserAction] = useState(null);

  const [isPending, setIsPending] = useState(false);

  const postType = category ? "a_" + postId : "n_" + postId;

  useEffect(() => {
    setViewCount(views);
    setLikeCount(like);
    setDislikeCount(dislike);
  }, [views, like, dislike]);

  // Load user action from localStorage and count view
  useEffect(() => {
    const savedAction = localStorage.getItem(postType);
    setUserAction(savedAction || null);
    handleView();
  }, [postType]);

  // Update post
  const updatePost = async (newView, newLike, newDislike) => {
    if (isPending) return;
    try {
      setIsPending(true);
      const formData = new FormData();
      formData.append("views", newView);
      formData.append("like", newLike);
      formData.append("dislike", newDislike);

      if (category) {
        await axios.patch(ApiRoutes.ARTICLE.PATCH + "/" + postId, formData);
        getArticle();
      } else {
        await axios.patch(ApiRoutes.NEWS.PATCH + "/" + postId, formData);
        getNews();
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsPending(false);
    }
  };

  const handleView = () => {
    const viewedKey = postType + "_view";

    // Load saved view value from localStorage
    if (localStorage.getItem(viewedKey)) return;

    const newView = Number(views) + 1;
    localStorage.setItem(viewedKey, "view");

    setViewCount(newView);
    updatePost(newView, likeCount, dislikeCount);
  };

  const handleLike = () => {
    if (isPending) return;

    let newLike = likeCount;
    let newDislike = dislikeCount;

    if (userAction === "like") {
      newLike -= 1;
      setUserAction(null);
      localStorage.removeItem(postType);
    } else {
      newLike += 1;
      if (userAction === "dislike") newDislike -= 1;
      setUserAction("like");
      localStorage.setItem(postType, "like");
    }

    newLike = Math.max(0, newLike);
    newDislike = Math.max(0, newDislike);

    setLikeCount(newLike);
    setDislikeCount(newDislike);
    updatePost(viewCount, newLike, newDislike);
  };

  const handleDislike = () => {
    if (isPending) return;

    let newLike = likeCount;
    let newDislike = dislikeCount;

    if (userAction === "dislike") {
      newDislike -= 1;
      setUserAction(null);
      localStorage.removeItem(postType);
    } else {
      newDislike += 1;
      if (userAction === "like") newLike -= 1;
      setUserAction("dislike");
      localStorage.setItem(postType, "dislike");
    }

    newLike = Math.max(0, newLike);
    newDislike = Math.max(0, newDislike);

    setLikeCount(newLike);
    setDislikeCount(newDislike);
    updatePost(viewCount, newLike, newDislike);
  };

  return (
    <>
      <span className="me-4">
        <i className="bi bi-eye-fill"></i> {viewCount}
      </span>

      <span
        className="me-4"
        style={{
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <i
          onClick={handleLike}
          className={`bi ${
            userAction === "like"
              ? "bi-hand-thumbs-up-fill"
              : "bi-hand-thumbs-up"
          }`}
          style={{
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        ></i>{" "}
        {likeCount}
      </span>

      <span
        className="me-4"
        style={{
          opacity: isPending ? 0.6 : 1,
        }}
      >
        <i
          onClick={handleDislike}
          className={`bi ${
            userAction === "dislike"
              ? "bi-hand-thumbs-down-fill"
              : "bi-hand-thumbs-down"
          }`}
          style={{
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        ></i>{" "}
        {dislikeCount}
      </span>
    </>
  );
};

export default PostStats;