// OTP Modal
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Modal.css";
import "../../pages/enduser/EndUser.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { useData } from "../../utils/DataContext";

const OTP = ({ email, password, api, modal_theme, setIsCompleted }) => {
  const { getAdmin } = useData();

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const [otp, setOtp] = useState("");
  const [errorOtp, setErrorOtp] = useState(false);

  const [isPending, setIsPending] = useState(false);

  // Reset password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (otp === "") {
      setErrorOtp(true);
      setIsPending(false);
      return;
    }

    const adminData = {
      user_OTP: otp,
      password: password
    };

    await axios
      .patch(api + "/" + email, adminData)
      .then((res) => {
        getAdmin();
        toast.success(res.data?.message);
        setIsCompleted(true);
        handleClose();
      })
      .catch((error) => {
        toast.error(error.response.data?.message || error.response.data?.error);
      }).finally(() => {
        setIsPending(false);
      });
  };

  return (
    <>
      {/* Model */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        keyboard={false}
        className={`${modal_theme === "#00798eff" ? "admin" : "superadmin"}-manage-posts`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Verify OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="form-group">
            <label className="d-flex justify-content-start ms-1">
              <i className="bi bi-file-binary-fill me-1"></i>OTP
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onInput={() => {
                setErrorOtp(false);
              }}
              required
            />
            {errorOtp && (
              <label className="text-danger d-flex justify-content-start ms-1">
                <i className="bi bi-exclamation-circle-fill me-1"></i>Please
                enter OTP!
              </label>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            style={{ backgroundColor: "#000000ff", border: 0, width: 120 }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="btn btn-primary"
            style={{ backgroundColor: modal_theme, border: 0, width: 120 }}
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? (
              <>
                <span className="me-1">
                  <i className="spinner-border spinner-border-sm"></i>
                </span>
                <span>Verifying...</span>
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OTP;