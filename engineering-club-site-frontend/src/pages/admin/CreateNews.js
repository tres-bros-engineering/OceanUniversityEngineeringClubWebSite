import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./Admin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";

const CreateNews = () => {
  UseTitleName("Create News | OCU Engineering Club");
  const navigate = useNavigate();
  const { getNews } = useData();

  const [title, setTitle] = useState("");
  const [publish, setPublish] = useState("");
  const [body, setBody] = useState("");

  // Add news
  const handleSubmit = (e) => {
    e.preventDefault();

    const news = {
      title: title,
      date: new Date(),
      body: body,
      author: "Test",
      views: 0,
      publish: publish
    };

    fetch(ApiRoutes.NEWS, {
      method: "POST",
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

        {/* Add News Form */}
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
                <i class="bi bi-send"></i>
              </span>
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNews;
