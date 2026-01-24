import { useNavigate } from "react-router-dom";
import UseTitleName from "../../utils/UseTitleName";
import "./SuperAdmin.css";
import { useState } from "react";
import ApiRoutes from "../../api/ApiRoutes";
import { useData } from "../../utils/DataContext";
import axios from "axios";
import { toast } from 'react-toastify';

const CreateCategory = () => {
  UseTitleName("Create Category");
  const navigate = useNavigate();
  const { category, getCategory } = useData();

  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const categoryData = {
      id: category.length === 0 ? 0 : category[category.length - 1].id,
      name: name,
    };

    await axios
      .post(ApiRoutes.CATEGORY.CREATE, categoryData)
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
        <h1>Create Category</h1>

        {/* Add Category Form */}
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
              style={{ backgroundColor: "#2200aa", border: 0, width: 120 }}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="me-1">
                    <i className="spinner-border spinner-border-sm"></i>
                  </span>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <span className="me-1">
                    <i className="bi bi-plus-circle"></i>
                  </span>
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
