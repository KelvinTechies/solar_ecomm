import React, { useState } from "react";
import { logout } from "../../reducx/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";

function NavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      if (
        error.message === "No authentication token found" ||
        error.response?.status === 401
      ) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // New function to handle link clicks
  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="navbar-header">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto d-lg-none">
            <button
              className="btn btn-outline-primary"
              onClick={toggleSidebar}
            >
              <iconify-icon
                icon="solar:hamburger-menu-linear"
                className="icon text-xl"
              />
            </button>
          </div>

          <div className="col-auto">
            <div className="d-flex flex-wrap align-items-center gap-4"></div>
          </div>

          <div className="col-auto">
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="dropdown">
                <button
                  className="d-flex justify-content-center align-items-center rounded-circle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="/dashboard/assets/images/users/user1.png"
                    alt="image"
                    className="w-40-px h-40-px object-fit-cover rounded-circle"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`da_sidebar ${isSidebarOpen ? "da_open" : ""}`}>
        <button className="da_close-btn" onClick={toggleSidebar}>
          ✖
        </button>
        <ul className="list-unstyled">
          <li>
            <Link 
              to="/dashboard" 
              className="d-flex align-items-center gap-2"
              onClick={handleLinkClick}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/create-account"
              onClick={handleLinkClick}
            >
              <PackagePlus className="mr-1" />
              <span>Create Account</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/accounts"
              onClick={handleLinkClick}
            >
              <PackagePlus className="mr-1" />
              <span>Accounts</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/add-product"
              className="d-flex align-items-center gap-2"
              onClick={handleLinkClick}
            >
              <PackagePlus size={18} />
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/add-feature"
              className="d-flex align-items-center gap-2"
              onClick={handleLinkClick}
            >
              <PackagePlus size={18} />
              Add Feature
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/products"
              className="d-flex align-items-center gap-2"
              onClick={handleLinkClick}
            >
              <Boxes size={18} />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/orders"
              className="d-flex align-items-center gap-2"
              onClick={handleLinkClick}
            >
              <ShoppingCart size={18} />
              Ordered Products
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/profile"
              className="d-flex align-items-center gap-2"
              onClick={handleLinkClick}
            > 
              <User size={18} />
              Profile
            </Link>
          </li>
          <li>
            <button
              className="dropdown-item text-white px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-2"
              onClick={() => {
                handleLinkClick();
                handleLogout();
              }}
            >
              <LogOut size={18} />
              Log Out
            </button>
          </li>
        </ul>
      </div>
      {isSidebarOpen && (
        <div className="da_overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
}

export default NavBar;