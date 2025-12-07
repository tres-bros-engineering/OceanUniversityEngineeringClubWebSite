// Deletion confirmation modal
import { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ modal_id, modal_title, modal_type, modal_button_theme, modal_delete, isPending, isModalOpen, setIsModalOpen }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <i
        className="btn bi bi-trash3-fill"
        style={{ border: 0 }}
        onClick={() => {
          handleShow();
          setIsModalOpen(true);
        }}
      ></i>

      {isModalOpen && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header>
            <Modal.Title>Delete {modal_type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the {modal_type.toLowerCase()} "
            {modal_title}"?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary"
              style={{ backgroundColor: "#000000ff", border: 0 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="btn btn-primary"
              style={{ backgroundColor: modal_button_theme, border: 0 }}
              onClick={() => {
                modal_delete(modal_id);
              }}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="me-1">
                    <i className="spinner-border spinner-border-sm"></i>
                  </span>
                  <span>Deleting...</span>
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default DeleteModal;