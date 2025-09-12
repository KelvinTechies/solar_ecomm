import React, { useState, useRef, useEffect } from 'react';
import api from '../../../services/api';

const ImageUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [showUploadForm, setShowUploadForm] = useState(true);
  
  const fileInputRef = useRef(null);

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await api.get('api/images');
      setImages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      showAlert('Failed to fetch images', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
console.log(images)
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelection = (file) => {
    if (!file.type.startsWith('image/')) {
      showAlert('Please select a valid image file.', 'danger');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showAlert('File size must be less than 5MB.', 'danger');
      return;
    }
    
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
    
    clearAlerts();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileSelection(files[0]);
    } else {
      showAlert('Please select a valid image file.', 'danger');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const showAlert = (message, type) => {
    const newAlert = {
      id: Date.now(),
      message,
      type
    };
    setAlerts(prev => [...prev, newAlert]);
    
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== newAlert.id));
    }, 5000);
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      showAlert('Please select an image to upload.', 'warning');
      return;
    }

    if (!formData.title.trim()) {
      showAlert('Please enter an image title.', 'warning');
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append('image', selectedFile);
    uploadFormData.append('title', formData.title);
    uploadFormData.append('description', formData.description);

    try {
      setUploading(true);
      setUploadProgress(0);

      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 90) {
          clearInterval(progressInterval);
        }
      }, 100);

      const response = await api.post('api/images/upload', uploadFormData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.data.success) {
        showAlert('Image uploaded successfully!', 'success');
        
        // Reset form and refresh images
        setTimeout(() => {
          setFormData({ title: '', description: '' });
          removeFile();
          clearAlerts();
          fetchImages(); // Refresh the images list
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }

    } catch (error) {
      console.error('Upload error:', error);
      showAlert(error.response?.data?.message || 'An error occurred during upload.', 'danger');
    } finally {
      setUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
      }, 2000);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image.id);
    setEditForm({
      title: image.title,
      description: image.description || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingImage(null);
    setEditForm({ title: '', description: '' });
  };

  const handleSaveEdit = async (imageId) => {
    try {
      const response = await api.put(`api/images/${imageId}`, editForm);
      
      if (response.data.success) {
        showAlert('Image updated successfully!', 'success');
        setEditingImage(null);
        fetchImages(); // Refresh the images list
      } else {
        throw new Error(response.data.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      showAlert(error.response?.data?.message || 'Failed to update image', 'danger');
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const response = await api.delete(`api/images/${imageId}`);
      
      if (response.data.success) {
        showAlert('Image deleted successfully!', 'success');
        fetchImages(); // Refresh the images list
      } else {
        throw new Error(response.data.message || 'Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showAlert(error.response?.data?.message || 'Failed to delete image', 'danger');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Toggle Button */}
        <div className="col-12 mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            <i className={`fas fa-${showUploadForm ? 'list' : 'plus'} me-2`}></i>
            {showUploadForm ? 'View Images' : 'Upload New Image'}
          </button>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">
                  <i className="fas fa-cloud-upload-alt me-2"></i>
                  Upload New Image
                </h4>
              </div>
              <div className="card-body">
                <div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Image Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter image title"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description (Optional)</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter image description"
                    />
                  </div>
                  
                  {/* Drag and Drop Area */}
                  <div
                    className={`upload-area ${dragOver ? 'dragover' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed #dee2e6',
                      borderRadius: '10px',
                      padding: '30px',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      backgroundColor: dragOver ? '#e7f3ff' : '#f8f9fa',
                      borderColor: dragOver ? '#0d6efd' : '#dee2e6',
                      transform: dragOver ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div style={{ fontSize: '2rem', color: '#6c757d', marginBottom: '10px' }}>
                      <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <p className="mb-2">Drag and drop your image here</p>
                    <p className="text-muted small">or click to browse files</p>
                    <input
                      type="file"
                      className="d-none"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileInputChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <i className="fas fa-folder-open me-2"></i>Browse
                    </button>
                  </div>
                  
                  {/* File Info */}
                  {selectedFile && (
                    <div className="mt-3 p-3 bg-light rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{selectedFile.name}</strong>
                          <small className="text-muted d-block">
                            {formatFileSize(selectedFile.size)}
                          </small>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={removeFile}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Progress Bar */}
                  {uploading && (
                    <div className="progress mt-3" style={{ height: '6px' }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                  
                  {/* Preview */}
                  {preview && (
                    <div className="text-center mt-3">
                      <img
                        src={preview}
                        alt="Preview"
                        style={{
                          maxWidth: '200px',
                          height: 'auto',
                          borderRadius: '8px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <div className="d-grid mt-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={!selectedFile || uploading || !formData.title.trim()}
                      onClick={handleSubmit}
                    >
                      {uploading ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-2"></i>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-upload me-2"></i>
                          Upload Image
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Images Gallery */}
        <div className={showUploadForm ? "col-md-6" : "col-12"}>
          <div className="card shadow">
            <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="fas fa-images me-2"></i>
                Uploaded Images ({images.length})
              </h4>
              <button
                className="btn btn-light btn-sm"
                onClick={fetchImages}
                disabled={loading}
              >
                <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
              </button>
            </div>
            <div className="card-body" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {loading ? (
                <div className="text-center py-4">
                  <i className="fas fa-spinner fa-spin fa-2x text-primary"></i>
                  <p className="mt-2">Loading images...</p>
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="fas fa-image fa-3x mb-3"></i>
                  <p>No images uploaded yet.</p>
                </div>
              ) : (
                <div className="row g-3">
                  {images.map((image) => (
                    <div key={image.id} className="col-md-6">
                      <div className="card">
                        <img
                          src={`https://api.solarvast.ng/${image.url}`}
                          alt={image.title}
                          className="card-img-top"
                          style={{ height: '150px', objectFit: 'cover' }}
                        />
                        <div className="card-body p-3">
                          {editingImage === image.id ? (
                            <div>
                              <input
                                type="text"
                                className="form-control form-control-sm mb-2"
                                name="title"
                                value={editForm.title}
                                onChange={handleEditInputChange}
                                placeholder="Title"
                              />
                              <textarea
                                className="form-control form-control-sm mb-2"
                                name="description"
                                value={editForm.description}
                                onChange={handleEditInputChange}
                                placeholder="Description"
                                rows="2"
                              />
                              <div className="btn-group btn-group-sm w-100">
                                <button
                                  className="btn btn-success"
                                  onClick={() => handleSaveEdit(image.id)}
                                >
                                  <i className="fas fa-save"></i> Save
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  onClick={handleCancelEdit}
                                >
                                  <i className="fas fa-times"></i> Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h6 className="card-title mb-1">{image.title}</h6>
                              {image.description && (
                                <p className="card-text small text-muted mb-2">
                                  {image.description}
                                </p>
                              )}
                              <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  {image.formatted_size || formatFileSize(image.size)}
                                </small>
                                <div className="btn-group btn-group-sm">
                                  <button
                                    className="btn btn-outline-primary"
                                    onClick={() => handleEdit(image)}
                                    title="Edit"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(image.id)}
                                    title="Delete"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert alert-${alert.type} alert-dismissible fade show`}
          >
            {alert.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => removeAlert(alert.id)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadForm;