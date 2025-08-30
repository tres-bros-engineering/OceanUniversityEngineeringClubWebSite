import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./PreviewPost.css";
import parse from "html-react-parser";
import FormatDate from "../../utils/FormatDate";
import "../../pages/enduser/EndUser.css";

const PreviewPost = ({ title, body, category, author }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Button  */}
      <button
        type="button"
        className="btn btn-primary me-2"
        style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
        onClick={handleShow}
      >
        <span className="me-1">
          <i className="bi bi-eye-fill"></i>
        </span>
        <span>Preview</span>
      </button>

      {/* Model */}
      <Modal show={show} onHide={handleClose} className="modal-xl">
        <Modal.Header closeButton style={{ backgroundColor: "#def3f6" }}>
          <Modal.Title>
            <span className="me-1">
              <i className="bi bi-eye-fill"></i>
            </span>
            <span>Preview</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <h2>{title}</h2>
          <div className="mt-1 fw-bold">
            <span className="me-4">
              <i className="bi bi-clock-fill"></i> {FormatDate(new Date())}
            </span>
            {/* Profile icon */}
            <div className="d-inline-block">
              <div
                className="d-flex justify-content-center align-items-center rounded-circle text-black fw-semibold bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  fontSize: "14px",
                }}
              >
                {author.charAt(0)}
              </div>
            </div>
            <span className="me-4"> {author}</span>
            {category ? (
              <span>
                <i className="bi bi-tags-fill"></i> {category}
              </span>
            ) : (
              <span>
                <i className="bi bi-tags"></i> News
              </span>
            )}
          </div>
          <div className="mt-1 mb-4 fw-bold">
            <span className="me-4">
              <i className="bi bi-eye-fill"></i> 0
            </span>
            {category && (
              <span>
                <i className="bi bi-chat-text-fill"></i> 0
              </span>
            )}
          </div>
          <div className="mt-4 rich-text-display">{parse(body)}</div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#def3f6" }}>
          <Button
            className="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PreviewPost;
