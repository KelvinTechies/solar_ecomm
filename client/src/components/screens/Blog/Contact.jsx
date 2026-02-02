import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add your API call here
      // await axios.post('/api/contact', formData);
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="position-relative w-100" style={{ height: 400 }}>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: 'url("/blog/assets/images/contact-bg.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          ></div>
        </div>

        <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
          <h1 className="text-white mb-3" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            Get In Touch
          </h1>
          <p className="text-white" style={{ fontSize: '1.2rem' }}>
            We'd love to hear from you
          </p>
        </div>
      </div>

      <Container className="py-5">
        {alert.show && (
          <Alert 
            variant={alert.type} 
            dismissible 
            onClose={() => setAlert({ ...alert, show: false })}
            className="mb-4"
          >
            {alert.message}
          </Alert>
        )}

        <Row className="g-4">
          {/* Contact Information */}
          <Col lg={4}>
            <div className="h-100">
              <h3 className="mb-4" style={{ color: "#11B7EB" }}>
                Contact Information
              </h3>
              
              <div className="mb-4 p-4 rounded shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex align-items-start mb-4">
                  <div 
                    className="rounded-circle p-3 me-3" 
                    style={{ backgroundColor: '#11B7EB' }}
                  >
                    <Phone size={24} color="white" />
                  </div>
                  <div>
                    <h5 className="mb-2">Phone</h5>
                    <p className="mb-0" style={{ fontSize: '1.1rem' }}>+234 806 694 1831</p>
                    <p className="mb-0" style={{ fontSize: '1.1rem' }}>+234 906 331 0554</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <div 
                    className="rounded-circle p-3 me-3" 
                    style={{ backgroundColor: '#F7C958' }}
                  >
                    <Mail size={24} color="white" />
                  </div>
                  <div>
                    <h5 className="mb-2">Email</h5>
                    <p className="mb-0" style={{ fontSize: '1.1rem' }}>info@solarvast.ng</p>
                    {/* <p className="mb-0" style={{ fontSize: '1.1rem' }}>support@solarvast.ng</p> */}
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <div 
                    className="rounded-circle p-3 me-3" 
                    style={{ backgroundColor: '#11B7EB' }}
                  >
                    <MapPin size={24} color="white" />
                  </div>
                  <div>
                    <h5 className="mb-2">Address</h5>
                    <p className="mb-0" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                      Upper Mission, Benin City,<br />
                      Edo state, Nigeria
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="mb-3">Business Hours</h5>
                <p style={{ lineHeight: 2, fontSize: '1.1rem' }}>
                  Monday - Friday: 8:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col lg={8}>
            <div className="p-4 rounded shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
              <h3 className="mb-4" style={{ color: "#F7C958" }}>
                Send Us a Message
              </h3>
              
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: '500', fontSize: '1.1rem' }}>
                        Full Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        style={{ padding: '12px', fontSize: '1rem' }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: '500', fontSize: '1.1rem' }}>
                        Email Address <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        style={{ padding: '12px', fontSize: '1rem' }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: '500', fontSize: '1.1rem' }}>
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        style={{ padding: '12px', fontSize: '1rem' }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: '500', fontSize: '1.1rem' }}>
                        Subject <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this about?"
                        required
                        style={{ padding: '12px', fontSize: '1rem' }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: '500', fontSize: '1.1rem' }}>
                        Message <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message here..."
                        required
                        style={{ padding: '12px', fontSize: '1rem' }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: '#11B7EB',
                        border: 'none',
                        padding: '14px',
                        fontSize: '1.1rem',
                        fontWeight: '500'
                      }}
                    >
                      {loading ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send size={20} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>

        {/* Map Section (Optional) */}
        <Row className="mt-5">
          <Col>
            <div className="rounded overflow-hidden shadow-sm" style={{ height: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7654321!2d3.3792057!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Contact;