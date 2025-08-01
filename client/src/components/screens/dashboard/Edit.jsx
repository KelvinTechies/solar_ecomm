import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  resetState,
  updateProduct,
} from "../../../reducx/productSlice";
import Swal from "sweetalert2";

function Edit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error, success } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description:"",
    image: null,
    video: null,
    needs_memory_card: false,
    free_delivery: false, // Added free delivery state
  });

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.data?.name || "",
        price: product.data?.price || "",
        description: product.data?.description || "",
        image: null,
        video: null,
        needs_memory_card: product.data?.needs_memory_card || false,
        free_delivery: product.data?.free_delivery || false, // Initialize from product data
      });
    }
  }, [product]);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Loading...",
        text: "Fetching product details...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  useEffect(() => {
    if (success) {
      Swal.fire("Updated!", "Product updated successfully.", "success");
      dispatch(resetState());
      navigate("/dashboard/products");
    }
  }, [success, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : prev[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData: formData }));
  };

  return (
    <div className="row gy-4 mt-5" style={{ margin: "auto" }}>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h6 className="card-title mb-0">Edit Product</h6>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="card-body">
            <div className="row gy-3">
              <form onSubmit={handleSubmit}>
                <div className="col-12">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Product Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="₦0.00"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control form-control-sm"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Product Video</label>
                  <input
                    type="file"
                    name="video"
                    className="form-control form-control-sm"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Product Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="needs_memory_card"
                      id="needsMemoryCard"
                      checked={formData.needs_memory_card}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="needsMemoryCard">
                      Requires Memory Card
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="free_delivery"
                      id="freeDelivery"
                      checked={formData.free_delivery}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="freeDelivery">
                      Free Delivery
                    </label>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-success">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;