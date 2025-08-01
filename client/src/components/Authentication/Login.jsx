import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  login,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
} from "../../reducx/authSlice";
import {NavLink, useNavigate} from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [l_loading, setLloading] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthLoading);
  const navigate = useNavigate()
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);


const handleSubmit = async (e) => {
  e.preventDefault();
setLloading(true)
  try {
    const resultAction = await dispatch(login({ email, password }));

    // Check if login was successful using unwrap()
    if (login.fulfilled.match(resultAction)) {
setLloading(false);

      navigate("/dashboard"); // Also fixed typo in "dashbord"
    }

  } catch (error) {
    // Handle login error if needed
setLloading(false);

    console.error("Login failed:", error);
  }
};
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">Login</h4>
              {error && (
                <div className="alert alert-danger" onClick={handleClearError}>
                  {error.message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={loading}
                >
                  {l_loading ? "Please wait ..." : "Login"}
                </button>
                <div className="float-right align-items-center btn btn-info mt-3">
                  <NavLink to="/forgot-password" className="text-white">
                    Forgot password?
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
