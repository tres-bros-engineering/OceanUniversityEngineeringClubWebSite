import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./Admin.css";
import { useState, useEffect } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useAuth } from "../../utils/AuthContext";
import PreviewPost from "../../components/modal/PreviewPost";
import axios from "axios";
import { toast } from 'react-toastify';

const CreateArticle = () => {
  UseTitleName("Create Article");
  const navigate = useNavigate();
  const { articles, getArticle, admin, category } = useData();
  const auth = useAuth();

  // Get admin attributes
  const user = admin?.find(
    (a) =>
      a.email === auth.getLocalStorageWithExpiry("admin")?.[2] ||
      a.email === auth.user
  );

  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, [user, navigate]);
  
  const [isPending, setIsPending] = useState(false);

  const [title, setTitle] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [image, setImage] = useState("");
  const [publish, setPublish] = useState("");
  const [body, setBody] = useState("");

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorCategory, setErrorCategory] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [errorPublish, setErrorPublish] = useState(false);
  const [errorBody, setErrorBody] = useState(false);

  // Modules for rich text editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
    ],
  };

  // Get Image
  const getImage = (e) => {
    const img = e.target.files[0];

    if (img && img.type.startsWith("image/")) {
      setImage(img);
    } else {
      setImage("");
      setErrorImage(true);
    }
  };

  // Add article
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    // Image validation
    if (!image || image === "") {
      setErrorImage(true);
      setIsPending(false);
      return;
    }

    // Rich text editor validation
    if (!body || body.trim() === "" || body === "<p><br></p>") {
      setErrorBody(true);
      setIsPending(false);
      return;
    }

    const formData = new FormData();
    formData.append('id', articles.length === 0 ? 0 : articles[articles.length - 1].id);
    formData.append('title', title);
    formData.append('category', categoryType);
    formData.append('file', image);
    formData.append('body', body);
    formData.append('admin_id', user?.id);
    formData.append('publish', publish);

    await axios
      .post(ApiRoutes.ARTICLE.CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        getArticle();
        navigate("/admin/article-manage");
        toast.success(res.data?.message);
      })
      .catch((error) => {
        setIsPending(false);
        toast.error(error.response.data?.error);
      });
  };

  return (
    <>
      <div className="container my-4 admin-manage-posts" data-aos="fade-up">
        <h1>Create Article</h1>

        {/* Add Article Form */}
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="bi bi-star-fill"></i> Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your article title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorTitle(true);
              }}
              onInput={() => setErrorTitle(false)}
              required
            />
            {errorTitle && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please enter
                your article title!
              </label>
            )}
          </div>
          <div className="form-group my-3">
            <select
              className="form-select"
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorCategory(true);
              }}
              onInput={() => setErrorCategory(false)}
              required
            >
              <option value="" selected hidden>
                --- Select Article Category ---
              </option>
              {category.map((c, index) => (
                <option key={index} value={c.name}>{c.name}</option>
              ))}
            </select>
            {errorCategory && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please select
                an article category!
              </label>
            )}
          </div>
          {/* Image Upload Area */}
          <div
            className="rounded mb-3 p-2 bg-white w-100 h-100"
            style={{ border: "2px solid #00798e" }}
          >
            <div
              className="p-3 rounded w-100 h-100"
              style={{ border: "2px dashed #00798e" }}
            >
              {image ? (
                <div className="d-flex justify-content-center mb-2">
                  <img
                    src={URL.createObjectURL(image)}
                    style={{ width: "250px" }}
                    className="rounded"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <i
                    className="bi bi-cloud-arrow-up-fill mb-2"
                    style={{ color: "#00798e", fontSize: "100px" }}
                  ></i>
                </div>
              )}
              <div className="d-flex justify-content-center">
                <label for="image-upload" className="custom-image-upload rounded">
                  Thumbnail Upload
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={getImage}
                />
              </div>
              {errorImage && (
                <label className="text-danger d-flex justify-content-center">
                  <i className="bi bi-exclamation-circle-fill me-1"></i> Please
                  select an article thumbnail image!
                </label>
              )}
            </div>
          </div>
          <div className="form-group mb-3">
            <select
              className="form-select"
              value={publish}
              onChange={(e) => setPublish(e.target.value === "true")}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorPublish(true);
              }}
              onInput={() => setErrorPublish(false)}
              required
            >
              <option value="" selected hidden>
                --- Select Publish Type ---
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errorPublish && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please select
                a publish type!
              </label>
            )}
          </div>
          {/* Rich Text Editor */}
          <div>
            <label>
              <i className="bi bi-chat-text-fill"></i> Body
            </label>
            <ReactQuill
              className="rich-text-editor"
              modules={modules}
              theme="snow"
              value={body}
              onChange={setBody}
              placeholder="Write something..."
            />
            {errorBody && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please enter
                something!
              </label>
            )}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-primary me-2"
              style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
              onClick={() => navigate("/admin/article-manage")}
            >
              Cancel
            </button>
            {/* Preview the post using a button */}
            <PreviewPost
              title={title ? title : "Article Title"}
              body={body}
              category={categoryType ? categoryType : "Article"}
              author={user?.name}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#00798eff", border: 0, width: 120 }}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="me-1">
                    <i className="spinner-border spinner-border-sm"></i>
                  </span>
                  <span>Posting...</span>
                </>
              ) : (
                <>
                  <span className="me-1">
                    <i className="bi bi-send"></i>
                  </span>
                  <span>Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
