import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../reducx/authSlice';
import { Boxes, LayoutDashboard, LogOut, PackagePlus, ShoppingCart, User } from 'lucide-react';

function SideBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Add handleLogout function
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
  return (
    <>
      <aside className="sidebar">
        <button type="button" className="sidebar-close-btn">
          <iconify-icon icon="radix-icons:cross-2" />
        </button>
        <div>
          <a href="index.html" className="sidebar-logo">
            <img
              src="/blog/assets/images/logo/logo_text.png"
              alt="site logo"
              className="light-logo"
            />
            <img
              src="/dashboard/assets/images/logo-light.png"
              alt="site logo"
              className="dark-logo"
            />
            <img
              src="/dashboard/assets/images/logo-icon.png"
              alt="site logo"
              className="logo-icon"
            />
          </a>
        </div>
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
            <li className="dropdown">
              <Link to="/dashboard">
                <LayoutDashboard className="mr-1" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/dashboard/create-account">
                <PackagePlus className="mr-1" />
                <span>Create Account</span>
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/dashboard/accounts">
                <PackagePlus className="mr-1" />
                <span>Accounts</span>
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/dashboard/add-product">
                <PackagePlus className="mr-1" />
                <span>Add Products</span>
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/dashboard/products">
                <Boxes className="mr-1" />
                <span>Products</span>
              </Link>
            </li>
             <li className="dropdown">
              <Link to="/dashboard/add-feature">
                <PackagePlus className="mr-1" />
                <span>Add Features </span>
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/dashboard/orders">
                <ShoppingCart className="mr-1" />
                <span>Ordered Products</span>
              </Link>
            </li>
            <li className="dropdown">
              <Link to="/dashboard/profile">
                <User className="mr-1" />
                <span>Profile</span>
              </Link>
            </li>
            <li className="dropdown">
              <button onClick={handleLogout} className="flex items-center">
                <LogOut className="mr-1" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideBar
