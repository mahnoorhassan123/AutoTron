import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import axios from "axios";
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

const API_BASE_URL = "http://localhost:8080/api/products";

const ProductCRUD = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete || !productToDelete._id) {
      console.error("Invalid productToDelete:", productToDelete);
      return setError("Invalid product selected for deletion.");
    }

    setLoading(true);
    try {
      console.log(`Deleting product with URL: ${API_BASE_URL}/${productToDelete._id}`);
      const response = await axios.delete(`${API_BASE_URL}/${productToDelete._id}`);

      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productToDelete._id)
        );
        setShowDeleteModal(false); // Close the modal after deletion
      } else {
        console.error("Unexpected response status:", response.status);
        setError("Failed to delete product. Please try again.");
      }
    } catch (err) {
      console.error("Error during delete API call:", err);
      setError("Failed to delete product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.description || !form.price || !form.category || !form.stock) {
      setError("All fields are required.");
      return;
    }

    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);

    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    if (isNaN(stock) || stock < 0) {
      setError("Stock cannot be negative.");
      return;
    }

    setLoading(true);
    try {
      const newProduct = { ...form, price, stock };

      if (editingProductId) {
        const response = await axios.put(`${API_BASE_URL}/${editingProductId}`, newProduct);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId ? response.data : product
          )
        );
      } else {
        const response = await axios.post(API_BASE_URL, newProduct);
        setProducts((prevProducts) => [...prevProducts, response.data]);
      }

      setForm({ name: "", description: "", price: "", category: "", stock: "" });
      setEditingProductId(null);
      setShowModal(false);
    } catch (err) {
      setError("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
    });
    setEditingProductId(product._id);
    setShowModal(true);
    setError(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProductId(null);
    setForm({ name: "", description: "", price: "", category: "", stock: "" });
  };

  const handleGenerateReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Description,Price,Category,Stock"]
        .concat(
          products.map(
            (p) =>
              `${p.name || "N/A"},${p.description || "N/A"},${p.price || "N/A"},${p.category || "N/A"},${p.stock || "N/A"}`
          )
        )
        .join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "products_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product)
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
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Product Management</h2>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            style={{ marginBottom: "20px", backgroundColor: "#007bff", borderColor: "#007bff" }}
            onClick={() => {
              setShowModal(true);
              setForm({ name: "", description: "", price: "", category: "", stock: "" });
              setEditingProductId(null);
              setError(null);
            }}
          >
            Add New Product
          </Button>

          <Button
            style={{ marginBottom: "20px", backgroundColor: "#28a745", borderColor: "#28a745" }}
            onClick={handleGenerateReport}
          >
            Generate Report
          </Button>
        </div>

        <div style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "auto", border: "1px solid #dee2e6" }}>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <Table striped bordered hover>
                  <thead style={{ backgroundColor: "#343a40", color: "#ffffff" }}>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td>
                          <Button
                            style={{ marginRight: "10px", backgroundColor: "#ffc107", borderColor: "#ffc107" }}
                            onClick={() => handleEdit(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                            onClick={() => {
                              setProductToDelete(product);
                              setShowDeleteModal(true);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p style={{ textAlign: "center" }}>No products available. Add some products to display here!</p>
              )}
            </>
          )}
        </div>

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editingProductId ? "Edit Product" : "Add New Product"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Product Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formCategory">
                <Form.Label>Product Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formStock">
                <Form.Label>Product Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Saving..." : editingProductId ? "Update Product" : "Add Product"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProductCRUD;