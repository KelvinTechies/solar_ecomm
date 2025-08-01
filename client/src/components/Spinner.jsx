import React from 'react'

function Spinner() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner
