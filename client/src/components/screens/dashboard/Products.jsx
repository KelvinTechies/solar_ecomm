import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../../reducx/productSlice';
import Swal from "sweetalert2";
import { FaEdit } from 'react-icons/fa';
import Spinner from '../../Spinner';

function Products() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire("Error!", error.message || "Failed to delete the product.", "error");
          });
      }
    });
  };

  // Safely access products with proper type checking
  const productsData = useSelector((state) => state.products.items?.data);
  const products = Array.isArray(productsData) ? productsData : [];

  if (error) {
    return (
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Products</h5>
        </div>
        <div className="card-body">
          {loading ? (
            <Spinner />
          ) : (
            <div className="table-responsive">
              <table className="table border-primary-table mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Product Video</th>
                    <th>Product Price</th>
                    <th>Product Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>
                          {product.image_url && (
                            <img
                              src={`https://api.solarvast.ng/${product.image_url}`}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded"
                              width={100}
                            />
                          )}
                        </td>
                        <td>
                          {product.video_url && (
                            <video
                              src={`https://api.solarvast.ng/${product.video_url}`}
                              className="w-20 h-20 object-cover rounded"
                              width={100}
                              controls
                            />
                          )}
                        </td>
                        <td>₦{product.price}</td>
                        <td>
                          {product?.description?.split(" ").length > 15
                            ? product.description.split(" ").slice(0, 15).join(" ") + "..."
                            : product.description}
                        </td>
                        <td className="d-flex align-items-center">
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="btn btn-link p-0 mr-3"
                          >
                            <i
                              style={{ fontSize: 20 }}
                              className="fa fa-trash text-danger"
                              aria-hidden="true"
                            />
                          </button>
                          <a 
                            href={`/dashboard/edit-product/${product.id}`}
                            className="btn btn-link p-0"
                          >
                            <FaEdit
                              size={20}
                              className="text-success"
                              aria-hidden="true"
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No Products Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;