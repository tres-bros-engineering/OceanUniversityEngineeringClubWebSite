import { useNavigate, useParams } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./Admin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";

const EditNews = () => {
  const navigate = useNavigate();
  const { idSlug } = useParams();
  const { news, getNews } = useData();

  // Check id to find the post
  const n = news.find((n) => n.id === idSlug);

  UseTitleName(n?.title + " | OCU Engineering Club");

  const [title, setTitle] = useState(n?.title);
  const [publish, setPublish] = useState(n?.publish);
  const [body, setBody] = useState(n?.body);

  // Update news
  const handleSubmit = (e) => {
    e.preventDefault();

    const news = {
      title: title,
      body: body,
      publish: publish,
    };

    fetch(ApiRoutes.NEWS + "/" + idSlug, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    })
      .then(() => {
        getNews();
        navigate("/admin/news-manage");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="my-4 px-5 admin-manage-posts" data-aos="fade-up">
        <h1>Create News</h1>

        {/* Edit News Form */}
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
                e.target.setCustomValidity("Please enter your news title")
              }
              onInput={(e) => e.target.setCustomValidity("")}
              required
            />
          </div>
          <div class="form-group my-3">
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
              placeholder="News Body..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter your news body")
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
              onClick={() => navigate("/admin/news-manage")}
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

export default EditNews;
