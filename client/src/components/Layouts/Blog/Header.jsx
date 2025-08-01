import React from 'react'
import { useDispatch } from 'react-redux';

function Header() {
  
  return (
    <header className="ec-header">
      {/*Ec Header Top Start */}
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            {/* Header Top phone Start */}
            <div className="col header-top-left">
              <div className="header-top-call">
                <i className="fi-rr-phone-call" /> Phone:
                <a href="tel:09063310554"> 09063310554</a>
              </div>
            </div>
            {/* Header Top phone End */}
            {/* Header Top call Start */}
            <div className="col header-top-center">
              <div className="header-top-call">
                Order online or call us 09063310554
              </div>
            </div>
            {/* Header Top call End */}
            {/* Header Top Language Currency */}
            <div className="col header-top-right d-none d-lg-block">
              <div className="header-top-right-inner d-flex justify-content-end">
                {/* Social Start */}
                <div className="header-top-social">
                  <ul className="mb-0">
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="ecicon eci-facebook" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="ecicon eci-twitter" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="ecicon eci-instagram" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="ecicon eci-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Social End */}
              </div>
            </div>
            {/* Header Top Language Currency */}
            {/* Header Top responsive Action */}
            <div className="col header-top-res d-lg-none">
              <div className="ec-header-bottons">
                <a
                  href="#ec-mobile-menu"
                  className="ec-header-btn ec-side-toggle ec-d-l d-lg-none"
                >
                  <i className="ecicon eci-bars" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ec-header-bottom d-none d-lg-block">
        <div className="container position-relative">
          <div className="row">
            <div className="header-bottom-flex">
              {/* Ec Header Logo Start */}
              <div className="align-self-center ec-header-logo ">
                <div className="header-logo">
                  <a href="/">
                    <img
                      src="/blog/assets/images/logo/logo_1.png"
                      alt="Site Logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ec Header Button End */}
      {/* Header responsive Bottom  Start */}
      <div className="ec-header-bottom d-lg-none">
        <div className="container position-relative">
          <div className="row ">
            {/* Ec Header Logo Start */}
            <div className="col">
              <div className="header-logo">
                <a href="index.html">
                  <img
                    src="/blog/assets/images/logo/logo-10.png"
                    alt="Site Logo"
                  />
                </a>
              </div>
            </div>
          
          </div>
        </div>
      </div>
      {/* Header responsive Bottom  End */}
      {/* EC Main Menu Start */}

      {/* Ec Main Menu End */}
      {/* Ekka Menu Start */}
   
    </header>
  );
}

export default Header
