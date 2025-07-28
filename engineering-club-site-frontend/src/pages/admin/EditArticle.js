import { useNavigate, useParams } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./Admin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";

const EditArticle = () => {
  const navigate = useNavigate();
  const { idSlug } = useParams();
  const { articles, getArticle } = useData();

  // Check id to find the post
  const article = articles.find((article) => article.id === idSlug);

  UseTitleName(article?.title + " | OCU Engineering Club");

  const [title, setTitle] = useState(article?.title);
  const [category, setCategory] = useState(article?.category);
  const [publish, setPublish] = useState(article?.publish);
  const [body, setBody] = useState(article?.body);

  // Update article
  const handleSubmit = (e) => {
    e.preventDefault();

    const article = {
      title: title,
      category: category,
      body: body,
      publish: publish,
    };

    fetch(ApiRoutes.ARTICLE + "/" + idSlug, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then(() => {
        getArticle();
        navigate("/admin/article-manage");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="my-4 px-5 admin-manage-posts" data-aos="fade-up">
        <h1>Create Article</h1>

        {/* Edit Article Form */}
        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              class="form-control"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter your article title")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            />
          </div>
          <div className="form-group my-3">
            <select
              class="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please select a category")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            >
              <option value="" selected hidden>
                --- Select Category ---
              </option>
              <option value="Pumps">Pumps</option>
              <option value="Ship Constructions">Ship Constructions</option>
              <option value="Ship Stability">Ship Stability</option>
              <option value="Ship Type">Ship Type</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-group mb-3">
            <input
              type="file"
              class="form-control"
              id="image"
              accept="image/*"
            />
          </div>
          <div className="form-group mb-3">
            <select
              class="form-select"
              value={publish}
              onChange={(e) => setPublish(e.target.value === "true")}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please select a publish type")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            >
              <option value="" selected hidden>
                --- Select Publish Type ---
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div class="form-group">
            <textarea
              class="form-control"
              id="body"
              rows="10"
              placeholder="Article Body..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter your article body")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              class="btn btn-primary me-2"
              style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
              onClick={() => navigate("/admin/article-manage")}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              style={{ backgroundColor: "#00798eff", border: 0, width: 120 }}
            >
              <span className="me-1">
                <i class="bi bi-pencil-square"></i>
              </span>
              <span>Update</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticle;
