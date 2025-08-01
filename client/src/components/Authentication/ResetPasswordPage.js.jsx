import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  resetPassword,
  selectAuthLoading,
  selectAuthError,
} from "../../reducx/authSlice";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    token: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      navigate("/login");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      token,
      email: decodeURIComponent(email),
    }));
  }, [searchParams, navigate]);

  const validateForm = () => {
    const errors = {};

   

    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await dispatch(resetPassword(formData));
    if (!result.error) {
      navigate("/login", {
        state: {
          message:
            "Password has been reset successfully. Please login with your new password.",
        },
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="w-100" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>

          {error && (
            <Alert variant="danger">
              {error.message ||
                "An error occurred while resetting your password"}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={formData.email} disabled />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                isInvalid={!!validationErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password_confirmation" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
                required
                isInvalid={!!validationErrors.password_confirmation}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.password_confirmation}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
