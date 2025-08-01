import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { Heart } from "lucide-react";
import { fetchProductById } from "../../../reducx/productSlice";
import { submitOrder } from "../../../reducx/orderSlice";
import Spinner from "../../Spinner";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { fetchAccounts } from "../../../reducx/accountSlice";

const Detail = () => {
  const dispatch = useDispatch();

  const { items: accounts, status } = useSelector(state => state.accounts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAccounts());
    }
  }, [status, dispatch]);


  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.products);
  const [showContactModal, setShowContactModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);


  const [o_loading, setOloading] = useState(false)


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
    subject: "",
    message: "",
    paymentProof: null,
    needMemoryCard: false,
    customMessage: "",
  });

  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);

  const handleClose = () => {
    setShow(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      quantity: 1,
      subject: "",
      message: "",
      paymentProof: null,
      needMemoryCard: false,
      customMessage: "",
    });
    setTotalAmount(0);
  };
  // const handleShow = () => setShow(true);

  const handleShow = () => {
    setShow(true);
    setTotalAmount(calculateTotal(1, false, product?.data?.price || 0));
  };



  const calculateTotal = (quantity, needMemoryCard, productPrice) => {
    const memoryCardCost = needMemoryCard ? 10000 : 0;
    const subtotal = quantity * productPrice;
    return subtotal + memoryCardCost;
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  // const handleInputChange = (e) => {
  //   const { name, value, files, type, checked } = e.target;

  //   if (type === 'checkbox' && name === 'needMemoryCard') {
  //     const message = checked ? "I need a memory card" : "";
  //     setFormData(prev => ({
  //       ...prev,
  //       needMemoryCard: checked,
  //       customMessage: message
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: files ? files[0] : value,
  //     }));
  //   }
  // };



  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    const newFormData = {
      ...formData,
      [name]: files ? files[0] : (type === 'checkbox' ? checked : value),
    };

    if (type === 'checkbox' && name === 'needMemoryCard') {
      const message = checked ? "I need a memory card" : "";
      newFormData.customMessage = message;
    }

    setFormData(newFormData);

    // Calculate total whenever quantity or memory card selection changes
    if (name === 'quantity' || name === 'needMemoryCard') {
      const newTotal = calculateTotal(
        name === 'quantity' ? Number(value) : formData.quantity,
        name === 'needMemoryCard' ? checked : formData.needMemoryCard,
        product?.data?.price || 0
      );
      setTotalAmount(newTotal);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setOloading(true);

    const formSubmission = new FormData();

    // Add the product ID to the form data
    if (product?.data?.id) {
      formSubmission.append('product_id', product.data.id);
      formSubmission.append('totalAmount', totalAmount);
    }

    // Append all form data including customMessage
    Object.keys(formData).forEach((key) => {
      if (key === 'needMemoryCard') return; // Skip the checkbox state
      if (key === 'paymentProof' && formData[key]) {
        formSubmission.append(key, formData[key]);
      } else if (key !== 'paymentProof') {
        formSubmission.append(key, formData[key]);
      }
    });

    try {
      const result = await dispatch(submitOrder(formSubmission));
      if (result.payload) {
        handleClose();
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          subject: "",
          message: "",
          paymentProof: null,
          needMemoryCard: false,
          customMessage: "",
        });
      }
      setOloading(false);
    } catch (error) {
      console.error("Order submission failed:", error);
      setOloading(false);
    }
  };

  const additionalImages = Array.isArray(product?.data?.additional_image_urls)
    ? product.data.additional_image_urls
    : JSON.parse(product?.data?.additional_image_urls || "[]");

  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "paymentProof" && files?.length > 0) {
  //     setFormData({
  //       ...formData,
  //       [name]: files[0],
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  if (loading) return <div className="text-center p-5"><Spinner /></div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;
  if (!product?.data)
    return <div className="text-center p-5">Product not found</div>;


  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Product Images Section */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="position-relative">
                <img
                  src={`https://api.solarvast.ng/${product.data.image_url}`}
                  alt={product.data.name}
                  className="img-fluid rounded w-100"
                  style={{ height: "400px", objectFit: "contain" }}
                />
                <button className="btn btn-light btn-sm position-absolute top-0 end-0 m-3 rounded-circle">
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>





        <div className="col-md-4" style={{ height: "400px", overflow: "hidden" }}>
          <Swiper spaceBetween={10} slidesPerView={2} style={{ height: "100%" }}>
            {additionalImages.map((image, index) => (
              <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <img
                  src={`https://api.solarvast.ng/${image}`}
                  alt={`Additional Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "auto", // Maintain aspect ratio
                    maxHeight: "100%", // Ensure it fits within the container
                    borderRadius: "8px",
                    objectFit: "cover", // Crop the image to fit the box if needed
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>



        {/* Product Details Section */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h3 mb-4">{product.data.name}</h1>
              <p className="h4 mb-4 text-primary">
                ₦{Number(product.data.price).toLocaleString()}
              </p>

              <div className="mb-4">
                <h2 className="h5 mb-3">Product Highlights</h2>
              </div>

              <p className="mb-4">{product.data.description}</p>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="p-1"
                  onClick={handleShow}
                >
                  Place Order
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="p-1"
                  onClick={() => setShowContactModal(true)}
                >
                  Contact Supplier
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="position-relative">
                <video
                  src={`https://api.solarvast.ng/${product.data.video_url}`}
                  controls
                  className="img-fluid rounded w-100"
                  style={{ height: "400px", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Order for {product.data.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div><strong>Unit Price:</strong> ₦{product?.data ? Number(product.data.price).toLocaleString() : 0}</div>
                <div><strong>Quantity:</strong> {formData.quantity}</div>
                {formData.needMemoryCard && (
                  <div><strong>Memory Card:</strong> ₦10,000</div>
                )}
              </div>
              <div className="text-end">
                <strong className="fs-5">Total: ₦{totalAmount.toLocaleString()}</strong>
              </div>
            </div>
          </div>
          <div className="alert alert-warning mb-3" role="alert">
            Please ensure you only make payments to these official account numbers. Be cautious of any payment requests through unofficial channels.
          </div>

          {/* Account listings */}
          <div className="mb-4">
            {accounts.map(account => (
              <div
                key={account.id}
                className="alert alert-success mb-2 p-3"
                role="alert"
              >
                <h6 className="fw-bold mb-1">{account.bank_name}</h6>
                <div>Account Name: {account.account_name}</div>
                <div>Account Number: {account.account_number}</div>
              </div>
            ))}
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group>
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-12">
              {product.data.needs_memory_card && (
            <Form.Group className="mb-3">
              <div className="alert alert-warning text-center" role="alert">
                <p><strong>Please note</strong> that a 64GB memory card is required for operation. Ensure you select the <br /> "I need a memory card" option to include it in your order, as all recordings will be saved to the memory card during camera use.</p>
              </div>
              <Form.Check
                type="checkbox"
                label="Need a memory card? (₦10,000)"
                name="needMemoryCard"
                checked={formData.needMemoryCard}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}
                {formData.needMemoryCard && product.data.needs_memory_card && (
            <Form.Group className="mb-3">
              <Form.Label>Additional Message</Form.Label>
              <Form.Control
                as="textarea"
                name="customMessage"
                value={formData.customMessage}
                readOnly
              />
            </Form.Group>
          )}

                <Form.Group>
                  <Form.Label>Payment Proof</Form.Label>
                  <Form.Control
                    type="file"
                    name="paymentProof"
                    onChange={handleInputChange}
                    accept="image/*,.pdf"
                    required
                  />
                  <Form.Text className="text-muted">
                    Accepted formats: (jpg, jpeg, png)
                  </Form.Text>
                </Form.Group>
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <Button variant="primary" type="submit" disabled={loading}>
                {o_loading ? "Processing..." : "Submit Order"}
              </Button>
            </div>
            {product.data && product.data.free_delivery && (
  <div className="alert alert-warning text-center" role="alert">
    <strong>Attention!</strong> Delivery is completely free! No extra charges apply.
  </div>
)}
          </Form>

        </Modal.Body>
      </Modal>

      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setShowContactModal(false);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Detail;
