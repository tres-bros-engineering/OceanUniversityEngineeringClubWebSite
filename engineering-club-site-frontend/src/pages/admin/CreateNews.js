import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./Admin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateNews = () => {
  UseTitleName("Create News | OCU Engineering Club");
  const navigate = useNavigate();
  const { getNews } = useData();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [publish, setPublish] = useState("");
  const [body, setBody] = useState("");

  // Modules for rich text editor 
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
    ],
  };

  // Get Image 
  const getImage = (e) => {
    const img = e.target.files[0];

    if (img && img.type.startsWith("image/")) {
      setImage(URL.createObjectURL(img));
    } else {
      setImage("");
    }
  };

  // Add news
  const handleSubmit = (e) => {
    e.preventDefault();

    const news = {
      title: title,
      img: image,
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
          {/* Image Upload Area */}
          <div
            class="rounded my-3 p-2 bg-white w-100 h-100"
            style={{ border: "2px solid #00798e" }}
          >
            <div
              className="p-3 rounded w-100 h-100"
              style={{ border: "2px dashed #00798e" }}
            >
              {image ? (
                <div className="d-flex justify-content-center mb-2">
                  <img
                    src={image}
                    style={{ width: "250px" }}
                    className="rounded"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <i
                    class="bi bi-cloud-arrow-up-fill mb-2"
                    style={{ color: "#00798e", fontSize: "100px" }}
                  ></i>
                </div>
              )}
              <div className="d-flex justify-content-center">
                <label for="image-upload" class="custom-image-upload">
                  Image Upload
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={getImage}
                  required
                />
              </div>
            </div>
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
          {/* Rich Text Editor */}
          <div>
            <ReactQuill
              className="rich-text-editor"
              modules={modules}
              theme="snow"
              value={body}
              onChange={setBody}
              placeholder="Write something..."
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
