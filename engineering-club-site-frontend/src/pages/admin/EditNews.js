import { useNavigate, useParams } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./Admin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import PreviewPost from "../../components/modal/PreviewPost";
import axios from "axios";
import { toast } from 'react-toastify';

const EditNews = () => {
  const navigate = useNavigate();
  const { idSlug } = useParams();
  const { news, getNews, admin } = useData();

  // Check id to find the post
  const n = news.find((n) => n.id === Number(idSlug));

  UseTitleName(n?.title);

  const [isPending, setIsPending] = useState(false);

  const [title, setTitle] = useState(n?.title);
  const [image, setImage] = useState(n?.img);
  const [publish, setPublish] = useState(n?.publish);
  const [body, setBody] = useState(n?.body);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const [errorBody, setErrorBody] = useState(false);

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
      setImage(img);
    } else {
      setImage("");
      setErrorImage(true);
    }
  };

  // Update news
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
    formData.append('title', title);
    formData.append('file', image);
    formData.append('body', body);
    formData.append('publish', publish);

    await axios
      .patch(ApiRoutes.NEWS.PATCH + "/" + idSlug, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        getNews();
        navigate("/admin/news-manage");
        toast.success(res.data?.message);
      })
      .catch((error) => {
        setIsPending(false);
        toast.error(error.response.data?.message || error.response.data?.error);
      });
  };

  return (
    <>
      <div className="container my-4 admin-manage-posts" data-aos="fade-up">
        <h1>Edit News</h1>

        {/* Edit News Form */}
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="bi bi-star-fill"></i> Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter your news title"
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
                your news title!
              </label>
            )}
          </div>
          {/* Image Upload Area */}
          <div
            className="rounded my-3 p-2 bg-white w-100 h-100"
            style={{ border: "2px solid #00798e" }}
          >
            <div
              className="p-3 rounded w-100 h-100"
              style={{ border: "2px dashed #00798e" }}
            >
              {image ? (
                <div className="d-flex justify-content-center mb-2">
                  <img
                    src={image === n?.img ? image : URL.createObjectURL(image)}
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
                  select a news thumbnail image!
                </label>
              )}
            </div>
          </div>
          <div className="form-group mb-3">
            <select
              className="form-select"
              value={publish}
              onChange={(e) => setPublish(e.target.value === "true")}
            >
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
              onClick={() => navigate("/admin/news-manage")}
            >
              Cancel
            </button>
            {/* Preview the post using a button */}
            <PreviewPost title={title ? title : "News Title"} body={body} author={admin.find((a) => a?.id === n?.admin_id)?.name} />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#00798eff", border: 0, width: 125 }}
              disabled={isPending || (title === n?.title && image === n?.img && publish === n?.publish && body === n?.body)}
            >
              {isPending ? (
                <>
                  <span className="me-1">
                    <i className="spinner-border spinner-border-sm"></i>
                  </span>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span className="me-1">
                    <i className="bi bi-pencil-square"></i>
                  </span>
                  <span>Update</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditNews;
