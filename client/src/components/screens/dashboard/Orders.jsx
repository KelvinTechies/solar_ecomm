import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../../reducx/orderSlice";
import Spinner from "../../Spinner";
import ImageModal from "../../ImageModal";
import Swal from "sweetalert2";

function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [loadingOrders, setLoadingOrders] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusUpdate = async (order, newStatus) => {
    if (!order?.id || !newStatus) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid order or status",
      });
      return;
    }

    setLoadingOrders((prev) => ({ ...prev, [order.id]: true }));

    try {
      const result = await dispatch(
        updateOrderStatus({
          orderId: order.id,
          status: newStatus,
          email: order.email,
        })
      ).unwrap();

      if (result) {
        dispatch(fetchOrders());
      }
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setLoadingOrders((prev) => ({ ...prev, [order.id]: false }));
    }
  };

  return (
    <>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Orders Management</h5>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <div className="card-body">
              <div className="table-responsive">
                <table className="table border-primary-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Order Number</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Payment Proof</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((order, index) => (
                        <tr key={order.id}>
                          <td>{index + 1}</td>
                          <td>{order.order_number}</td>
                          <td>{order.full_name}</td>
                          <td>{order.email}</td>
                          <td>
                            <img
                              src={order.payment_proof}
                              alt="Order Proof"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setSelectedImage(order.payment_proof)
                              }
                            />
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === "pending"
                                  ? "bg-warning"
                                  : order.status === "processing"
                                  ? "bg-info"
                                  : order.status === "delivered"
                                  ? "bg-success"
                                  : order.status === "cancelled"
                                  ? "bg-danger"
                                  : ""
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="d-flex align-items-center">
                            {order.status === "pending" && (
                              <button
                                className="btn btn-sm btn-primary me-2"
                                onClick={() =>
                                  handleStatusUpdate(order, "processing")
                                }
                                disabled={loadingOrders[order.id]}
                              >
                                {loadingOrders[order.id]
                                  ? "Please wait..."
                                  : "Process"}
                              </button>
                            )}
                            {order.status === "processing" && (
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                  handleStatusUpdate(order, "delivered")
                                }
                                disabled={loadingOrders[order.id]}
                              >
                                {loadingOrders[order.id]
                                  ? "Please wait..."
                                  : "Deliver"}
                              </button>
                            )}
                            {order.status !== "delivered" && (
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleStatusUpdate(order, "cancelled")
                                }
                                disabled={loadingOrders[order.id]}
                              >
                                {loadingOrders[order.id]
                                  ? "Please wait..."
                                  : "Cancel"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <ImageModal
        imageUrl={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}

export default Orders;
