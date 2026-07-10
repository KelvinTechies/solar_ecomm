import React, { useState } from 'react'
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import TrackingModal from '../../TrackingModal';
import Qrcode from './Qrcode';
import GoogleTranslate from './GoogleTranslate';

function NavBar() {
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  return (
    <>
      {/* Top Bar */}
      <div className="bg-light py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col text-center">
              Order online or call us 09063310554
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              {/* <h1 className="h3 text-orange mb-0"> */}
              <a href="javascript:void(0)">
                <img
                  src="/blog/assets/images/logo/logo_text.png"
                  width={300}
                  alt=""
                />
              </a>
              {/* </h1> */}
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-3">
            <div className="d-flex align-items-center gap-4 justify-content-between flex-wrap">
              {/* <button className="btn btn-warning px-4">CATEGORIES</button> */}
              <div className="nav">
                <a className="nav-link" href="/">
                  HOME
                </a>

                <a className="nav-link" href="/distributor">
                  BECOME A DISTRIBUTOR
                </a>
                <a className="nav-link" href="/contact">
                  Contact Us
                </a>

                <a
                  className="nav-link"
                  role="button"
                  onClick={() => setShowTrackingModal(true)}
                >
                  TRACK YOUR PRODUCT
                </a>
              </div>

              <div className="google-translator-container">
                <GoogleTranslate />
              </div>

              <TrackingModal
                show={showTrackingModal}
                onHide={() => setShowTrackingModal(false)}
              />
            </div>
          </nav>
        </div>
          </header>
          {<Outlet/>}
          <Qrcode /> 
          <Footer/>
    </>
  );
}

export default NavBar
