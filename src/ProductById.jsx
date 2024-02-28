import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";

function ProductById() {
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:8080/api/v1/public/randomproducts/${productId}`;
      const response = await axios.get(apiUrl);
      setProductData(response.data); // Assuming response.data is an object containing product data
      setError(null); // Reset error state if successful
    } catch (error) {
      console.error("Error fetching data:", error);
      setProductData(null);
      setError("Product not found or an error occurred."); // Set error message
    }
  };

  return (
    <div>
      <h1>Get Product By ID</h1>
      <Form>
        <Form.Group controlId="productIdInput">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchData}>
          Fetch Product Data
        </Button>
      </Form>
      {productData && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
              <th>images</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(productData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{typeof value === "object" ? JSON.stringify(value) : value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ProductById;