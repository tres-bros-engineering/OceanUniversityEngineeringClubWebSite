import { useNavigate, useParams } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./SuperAdmin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import axios from "axios";
import { toast } from 'react-toastify';

const EditCategory = () => {
  const navigate = useNavigate();
  const { idSlug } = useParams();
  const { category, getCategory } = useData();

  // Check id to find the category
  const c = category.find((c) => c.id === Number(idSlug));

  UseTitleName(c?.name);

  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState(c?.name);
  const [errorName, setErrorName] = useState(false);

  // Update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    await axios
      .patch(ApiRoutes.CATEGORY.PATCH + "/" + idSlug, { name: name })
      .then((res) => {
        getCategory();
        navigate("/superadmin/category-manage");
        toast.success(res.data?.message);
      })
      .catch((error) => {
        setIsPending(false);
        toast.error(error.response.data?.message || error.response.data?.error);
      });
  };

  return (
    <>
      <div className="container my-4 superadmin-manage-posts" data-aos="fade-up">
        <h1>Edit Category</h1>

        {/* Edit Category Form */}
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <i className="bi bi-tags-fill"></i> Category Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onInvalid={(e) => {
                e.preventDefault();
                setErrorName(true);
              }}
              onInput={() => setErrorName(false)}
              required
            />
            {errorName && (
              <label className="text-danger">
                <i className="bi bi-exclamation-circle-fill"></i> Please enter
                category name!
              </label>
            )}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-primary me-2"
              style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
              onClick={() => navigate("/superadmin/category-manage")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "#2200aa", border: 0, width: 125 }}
              disabled={isPending || name === c?.name}
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

export default EditCategory;