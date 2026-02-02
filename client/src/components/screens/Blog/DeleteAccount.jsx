import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal, Alert } from 'react-bootstrap';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

function DeleteAccount() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShowModal = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    
    try {
      // Add /api prefix since the route is in api.php
      const response = await api.post('/api/auth/delete-by-email', { email });
      
      // Clear user data from localStorage/sessionStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Close modal
      setShowModal(false);
      
      // Show success message
      alert('Your account has been successfully deleted');
      
      // Redirect to home or login page
      navigate('/');
      
    } catch (error) {
      console.error('Delete account error:', error);
      setError(error.response?.data?.message || 'Failed to delete account. Please try again.');
      setShowModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="position-relative w-100" style={{ height: 300 }}>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          ></div>
        </div>

        <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
          <h1 className="text-white mb-3" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            Delete Account
          </h1>
          <p className="text-white" style={{ fontSize: '1.1rem' }}>
            We're sorry to see you go
          </p>
        </div>
      </div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Warning Alert */}
            <Alert variant="danger" className="mb-4">
              <div className="d-flex align-items-start gap-3">
                <AlertTriangle size={24} />
                <div>
                  <h5 className="mb-2">Warning: This action cannot be undone!</h5>
                  <p className="mb-0" style={{ lineHeight: 1.8 }}>
                    Deleting your account will permanently remove all your data, including:
                  </p>
                  <ul className="mt-2 mb-0">
                    <li>Your profile information</li>
                    <li>Order history</li>
                    <li>Saved preferences</li>
                    <li>All associated data</li>
                  </ul>
                </div>
              </div>
            </Alert>

            {/* Delete Form */}
            <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
              <h3 className="mb-4" style={{ color: "#dc3545" }}>
                Confirm Account Deletion
              </h3>

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleShowModal}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: '500', fontSize: '1.1rem' }}>
                    Enter your email address to confirm <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    style={{ padding: '12px', fontSize: '1rem' }}
                  />
                  <Form.Text className="text-muted">
                    Please enter the email address associated with your account
                  </Form.Text>
                </Form.Group>

                <div className="mb-4 p-3 rounded" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
                  <h6 className="mb-2">Before you go, please note:</h6>
                  <ul className="mb-0" style={{ fontSize: '0.95rem' }}>
                    <li>Any pending orders will be cancelled</li>
                    <li>You will not be able to recover your account</li>
                    <li>All your data will be permanently deleted within 30 days</li>
                    <li>You can create a new account anytime with the same email</li>
                  </ul>
                </div>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="danger"
                    size="lg"
                    className="d-flex align-items-center justify-content-center gap-2"
                    style={{ padding: '14px', fontSize: '1.1rem', fontWeight: '500' }}
                  >
                    <Trash2 size={20} />
                    Delete My Account
                  </Button>
                  
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    onClick={() => navigate(-1)}
                    style={{ padding: '14px', fontSize: '1.1rem' }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>

            {/* Alternative Options */}
            <div className="mt-4 p-4 rounded shadow-sm" style={{ backgroundColor: '#e7f3ff' }}>
              <h5 className="mb-3">Looking for alternatives?</h5>
              <p style={{ lineHeight: 1.8 }}>
                If you're experiencing issues with your account, our support team is here to help. 
                Consider reaching out to us before deleting your account.
              </p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/contact')}
                style={{ backgroundColor: '#11B7EB', border: 'none' }}
              >
                Contact Support
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid #dc3545' }}>
          <Modal.Title className="text-danger">
            <AlertTriangle size={24} className="me-2" />
            Final Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            <div className="mb-4">
              <Trash2 size={60} color="#dc3545" />
            </div>
            <h5 className="mb-3">Are you absolutely sure?</h5>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              This action <strong>CANNOT</strong> be undone. This will permanently delete your account 
              <strong> {email}</strong> and remove all your data from our servers.
            </p>
            <div className="alert alert-danger mt-3">
              <strong>Warning:</strong> All your data will be lost forever!
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose} size="lg">
            No, Keep My Account
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteAccount} 
            disabled={loading}
            size="lg"
          >
            {loading ? 'Deleting...' : 'Yes, Delete Forever'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccount;