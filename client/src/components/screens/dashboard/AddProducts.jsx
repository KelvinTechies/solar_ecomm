import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetState } from "../../../reducx/productSlice";

function AddProducts() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    additional_images: [],
    video: null,
    needs_memory_card: false,
    free_delivery: false, // Added free delivery state
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalPreviews, setAdditionalPreviews] = useState([]);

  useEffect(() => {
    if (success) {
      setFormData({
        name: "",
        price: "",
        description: "",
        image: null,
        additional_images: [],
        video: null,
        needs_memory_card: false,
        free_delivery: false, // Reset free delivery checkbox when form is successful
      });
      setMainImagePreview(null);
      setAdditionalPreviews([]);
      const timer = setTimeout(() => {
        dispatch(resetState());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    
    if (name === 'image') {
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview);
      }
      setFormData(prev => ({
        ...prev,
        image: files[0]
      }));
      if (files[0]) {
        setMainImagePreview(URL.createObjectURL(files[0]));
      }
    } else if (name === 'additional_images') {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        additional_images: [...prev.additional_images, ...newFiles]
      }));
      
      setAdditionalPreviews(prev => [...prev, ...newPreviews]);
    } else if (name === 'video') {
      setFormData(prev => ({
        ...prev,
        video: files[0]
      }));
    } else if (type === 'checkbox') {
      // Special handling for checkbox inputs to use the checked property
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const removeAdditionalImage = (index) => {
    // Remove the image from formData
    setFormData(prev => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index)
    }));

    // Revoke the URL and remove the preview
    URL.revokeObjectURL(additionalPreviews[index]);
    setAdditionalPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting additional images:", formData.additional_images);
    console.log("Number of additional images:", formData.additional_images.length);
    console.log("Needs memory card:", formData.needs_memory_card);
    console.log("Free delivery:", formData.free_delivery); // Log free delivery status
    
    const result = await dispatch(addProduct(formData));

    if (addProduct.fulfilled.match(result)) {
      console.log("Product added successfully");
      // Clean up preview URLs
      if (mainImagePreview) {
        URL.revokeObjectURL(mainImagePreview);
      }
      additionalPreviews.forEach(url => URL.revokeObjectURL(url));
    }
  };


  return (
    <div className="row gy-4 mt-5" style={{ margin: "auto" }}>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h6 className="card-title mb-0">Add Product</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => dispatch(resetState())}
                  />
                </div>
              )}

              {success && (
                <div className="alert alert-success alert-dismissible fade show">
                  Product added successfully!
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => dispatch(resetState())}
                  />
                </div>
              )}

              <div className="row gy-3">
                <div className="col-12">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Product Name"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Product Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="₦0.00"
                    min="0"
                    step="0.01"
                    required
                  />
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
                <div className="col-12">
                  <label className="form-label">Main Product Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    accept="image/*"
                    required
                  />
                  {mainImagePreview && (
                    <div className="mt-2">
                      <img
                        src={mainImagePreview}
                        alt="Main preview"
                        style={{
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="col-12">
                <label className="form-label">Additional Product Images</label>
                <input
                  type="file"
                  name="additional_images"
                  onChange={handleChange}
                  className="form-control form-control-sm"
                  accept="image/*"
                  multiple
                />
                <div className="mt-2 d-flex gap-2 flex-wrap">
                  {additionalPreviews.map((url, index) => (
                    <div key={index} className="position-relative">
                      <img
                        src={url}
                        alt={`Additional preview ${index + 1}`}
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm position-absolute"
                        style={{
                          top: '-10px',
                          right: '-10px',
                          borderRadius: '50%',
                          padding: '4px 8px'
                        }}
                        onClick={() => removeAdditionalImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>


                <div className="col-12">
                  <label className="form-label">Product Video (Optional)</label>
                  <input
                    type="file"
                    name="video"
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    accept="video/*"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Product Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control form-control-lg"
                    placeholder="Product Description"
                    required
                  ></textarea>
                </div>

                <div className="col-12 mt-3">
                  <button
                    type="submit"
                    className="btn btn-info"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Adding...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;