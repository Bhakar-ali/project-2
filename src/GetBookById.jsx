import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";

function GetBookById() {
  const [bookId, setBookId] = useState("");
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setBookId(e.target.value);
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:8080/api/v1/public/books/${bookId}`;
      const response = await axios.get(apiUrl);
      setBookData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBookData(null);
      setError("Book not found or an error occurred.");
    }
  };

  return (
    <div>
      <h1>Get Book By ID</h1>
      <Form>
        <Form.Group controlId="bookIdInput">
          <Form.Label>Book ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book ID"
            value={bookId}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchData}>
          Fetch Book Data
        </Button>
      </Form>
      {bookData && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(bookData).map(([key, value]) => (
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

export default GetBookById;
