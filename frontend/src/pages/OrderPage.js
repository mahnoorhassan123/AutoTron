import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/sidebar";
import {
  Modal,
  Button,
  Table,
  Form,
  Spinner,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = "http://localhost:8080/api/orders";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    console.log(`Updating order with ID: ${id} and status: ${status}`);
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { status });
      console.log(response.data);  // Log the response to verify the updated order

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === id ? { ...order, status: response.data.status } : order
          )
        );
      } else {
        setError("Failed to update order status");
      }
    } catch (err) {
      setError("Error updating order status.Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) =>
    Object.values(order)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto", backgroundColor: "#f8f9fa", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Order Management</h2>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto", border: "1px solid #dee2e6" }}>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              {filteredOrders.length > 0 ? (
                <Table striped bordered hover>
                  <thead style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
                    <tr>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id}> {/* Use order._id or order.id based on backend data */}
                        <td>{order.id}</td>
                        <td>{order.product}</td>
                        <td>{order.quantity}</td>
                        <td>{order.status}</td>
                        <td>{order.customer}</td>
                        <td>
                          <Button
                            style={{ marginRight: "10px", backgroundColor: "#ffc107", borderColor: "#ffc107" }}
                            onClick={() => handleUpdateStatus(order.id, "Pending")} // Move comment outside the JSX


                          >
                            Mark as Pending
                          </Button>
                          <Button
                            style={{ backgroundColor: "#28a745", borderColor: "#28a745" }}
                            onClick={() => handleUpdateStatus(order.id, "Delivered")}  //Update to order._id 
                          >
                            Mark as Delivered
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p style={{ textAlign: "center" }}>No orders available. Add some orders to display here!</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
