import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Spinner,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Heart, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProducts } from "../../../reducx/productSlice";
import { submitOrder } from "../../../reducx/orderSlice";
import { fetchAccounts } from "../../../reducx/accountSlice";

function BProducts() {
  const dispatch = useDispatch();

  const { items: accounts, status } = useSelector(state => state.accounts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAccounts());
    }
  }, [status, dispatch]);
  const { loading, error } = useSelector((state) => state.orders);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const products = useSelector((state) => state.products.items.data);

  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    quantity: 1,
    address: "",
    paymentProof: null,
    needMemoryCard: false,
    customMessage: "",
  });
  const calculateTotal = (quantity, needMemoryCard, productPrice) => {
    const memoryCardCost = needMemoryCard ? 10000 : 0;
    const cleanPrice = productPrice.toString().replace(/,/g, '');
    const subtotal = quantity * parseFloat(cleanPrice);
    return subtotal + memoryCardCost;
  };
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts());
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);
  const formatPrice = (priceString) => {
    if (!priceString) return '0';
    try {
      // Remove commas and convert to number
      const cleanPrice = priceString.replace(/,/g, '');
      const number = parseFloat(cleanPrice);
      
      if (isNaN(number)) return '0';
      
      // Format with commas
      return number.toLocaleString();
    } catch (error) {
      console.error('Price formatting error:', error);
      return '0';
    }
  };

  // const handleClose = () => {
  //   setShow(false);
  //   setFormData({
  //     fullName: "",
  //     email: "",
  //     phone: "",
  //     quantity: 1,
  //     address: "",
  //     paymentProof: null,
  //     needMemoryCard: false,
  //     customMessage: "",
  //   });
  // };
  const handleClose = () => {
    setShow(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      quantity: 1,
      address: "",
      paymentProof: null,
      needMemoryCard: false,
      customMessage: "",
    });
    setTotalAmount(0);
  };

  // const handleShow = (product) => {
  //   setSelectedProduct(product);
  //   setShow(true);
  // };
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
    const cleanPrice = product.price.toString().replace(/,/g, '');
    setTotalAmount(calculateTotal(1, false, cleanPrice));
  };
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
        selectedProduct?.price || 0
      );
      setTotalAmount(newTotal);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formSubmission = new FormData();

    // Add the selected product ID to the form data
    if (selectedProduct) {
      formSubmission.append('product_id', selectedProduct.id);
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

    // Log what's being sent
    for (let pair of formSubmission.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const result = await dispatch(submitOrder(formSubmission));
      if (result.payload) {
        handleClose();
      }
    } catch (error) {
      console.error('Order submission failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
          <p className="mt-3 text-muted">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!products || products === "No Products") {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <h3 className="mb-2">No Products Available</h3>
          <p className="text-muted">Check back later for new products.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Container className="py-4">
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
              <Card className="h-100 shadow-sm hover-shadow transition">
                <NavLink to={`/product-detail/${product.id}`} className="text-decoration-none">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={`https://api.solarvast.ng/${product.image_url}`}
                      alt={product.name}
                      className="p-3"
                      style={{
                        height: "280px",
                        objectFit: "contain",
                      }}
                    />
                    <Button
                      variant="light"
                      size="sm"
                      className="position-absolute top-0 end-0 m-3 rounded-circle shadow-sm opacity-75 hover-opacity-100"
                      style={{ transition: "opacity 0.2s ease" }}
                    >
                      <Heart size={18} />
                    </Button>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6 mb-3 text-truncate">
                      {product.name}
                    </Card.Title>
                    <p className="card-text fw-bold text-primary mb-3">
                    ₦{formatPrice(product.price)}
                    </p>
                    <div className="mt-auto">
                      <NavLink to={`/product-detail/${product.id}`} className="btn btn-info w-100 mb-2 text-white">
                        Details
                      </NavLink>
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleShow(product);
                        }}
                        className="w-100"
                      >
                        Place Order
                      </Button>
                    </div>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Submit Your Order{" "}
              <span className="text-primary">{selectedProduct?.name}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="alert alert-info mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
              <div><strong>Unit Price:</strong> ₦{selectedProduct ? formatPrice(selectedProduct.price) : '0'}</div>
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
    <Form.Label>Phone Number</Form.Label>
    <Form.Control
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Quantity</Form.Label>
    <Form.Control
      type="number"
      name="quantity"
      value={formData.quantity}
      onChange={handleInputChange}
      required
      min="1"
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Address</Form.Label>
    <Form.Control
      type="text"
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  {selectedProduct && selectedProduct.needs_memory_card && (
    <>
      <Form.Group className="mb-3">
        <div className="alert alert-warning text-center" role="alert">
          <p><strong>Please note</strong> that a 64GB memory card is required for operation. Ensure you select the <br/> "I need a memory card" option to include it in your order, as all recordings will be saved to the memory card during camera use.</p>
        </div>
        <Form.Check
          type="checkbox"
          label="Need a memory card? (₦10,000)"
          name="needMemoryCard"
          checked={formData.needMemoryCard}
          onChange={handleInputChange}
        />
      </Form.Group>

      {formData.needMemoryCard && (
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
    </>
  )}

  <Form.Group className="mb-3">
    <Form.Label>Payment Proof (Only images)</Form.Label>
    <Form.Control
      type="file"
      name="paymentProof"
      accept=".pdf,.jpg,.jpeg,.png"
      onChange={handleInputChange}
      required
    />
  </Form.Group>

  <Button
    variant="primary"
    type="submit"
    disabled={loading}
    className="w-100"
  >
    {loading ? (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
        Submitting...
      </>
    ) : (
      "Submit Order"
    )}
  </Button>
  
  {selectedProduct && selectedProduct.free_delivery && (
  <div className="alert alert-warning text-center" role="alert">
    <strong>Attention!</strong> Delivery is completely free! No extra charges apply.
  </div>
)}
  {error && <div className="text-danger mt-2">{error.message}</div>}
</Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default BProducts;