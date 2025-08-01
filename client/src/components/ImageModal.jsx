import React, { useEffect, useRef } from "react";
import { X, Download } from "lucide-react";
import { Modal } from "bootstrap";

const ImageModal = ({ imageUrl, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    // Initialize Bootstrap modal
    modalInstance.current = new Modal(modalRef.current, {
      backdrop: "static",
      keyboard: false,
    });

    // Cleanup on component unmount
    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      modalInstance.current?.show();
    } else {
      modalInstance.current?.hide();
    }
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "payment-proof.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle modal close event
  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    modalElement.addEventListener("hidden.bs.modal", handleModalClose);

    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, [onClose]);

  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby="imageModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="imageModalLabel">
              Payment Proof
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          {/* Image Container */}
          <div className="modal-body text-center">
            <img
              src={imageUrl}
              alt="Payment Proof"
              className="img-fluid"
              style={{ maxHeight: "60vh" }}
            />
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              onClick={handleDownload}
              className="btn btn-primary d-flex align-items-center gap-2"
            >
              <Download size={16} />
              <span>Download Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
