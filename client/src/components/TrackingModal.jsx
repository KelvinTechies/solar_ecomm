import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Search, Mail, HelpCircle } from 'lucide-react';
import api from '../services/api';

const TrackingModal = ({ show, onHide }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState('');
  const handleTracking = async (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError('Please enter a valid order number');
      return;
    }
  
    setLoading(true);
    setError('');
    setTrackingResult(null);
  
    try {
      const response = await api.post('api/track-order', { order_number: orderNumber });
      setTrackingResult(response.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="fade"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">
          <div className="d-flex align-items-center justify-content-center gap-2">
            <i className="bi bi-box"></i>
            Track Your Product
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <Alert variant="info" className="d-flex align-items-center gap-2">
            <Mail size={20} />
            <div>
              <strong>Check Your Email!</strong> Your order number was sent to your email after purchase.
            </div>
          </Alert>
        </div>

        <Form onSubmit={handleTracking}>
          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center gap-2">
              Order Number
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>You can find your order number in the confirmation email we sent you</Tooltip>}
              >
                <span className="text-muted cursor-pointer">
                  <HelpCircle size={16} />
                </span>
              </OverlayTrigger>
            </Form.Label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Enter the order number from your email"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
              <Search className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted" size={20} />
            </div>
            <Form.Text className="text-muted">
              Can't find your order number? Check your spam folder or contact support.
            </Form.Text>
          </Form.Group>

          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span>Tracking...</span>
              </div>
            ) : (
              'Track Order'
            )}
          </Button>
        </Form>

        {trackingResult && (
          <div className="mt-4 p-3 bg-light rounded">
            <h5 className="mb-3">Tracking Information</h5>
            <div className="tracking-details">
            <div className="mb-2">
                <strong>full_name:</strong> {trackingResult.full_name}
              </div>
              <div className="mb-2">
                <strong>Order Date:</strong> {trackingResult.order_date}
              </div>
              <div className="mb-2">
  <strong>Status:</strong> 
  <span className={`badge ms-2 ${trackingResult.status === 'pending' ? 'bg-danger' 
    : trackingResult.status === 'processing' ? 'bg-warning text-dark' 
    : trackingResult.status === 'delivered' ? 'bg-success' 
    : 'bg-secondary'}`}>
    {trackingResult.status}
  </span>
</div>

            
              <div className="mb-2">
                <strong>Delivery Location:</strong> {trackingResult.current_location}
              </div>
             
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TrackingModal;