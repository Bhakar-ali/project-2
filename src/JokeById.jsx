import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";

function JokeById() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:8080/api/v1/public/randomjokes/100${userId}`;
      const response = await axios.get(apiUrl);
      setUserData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData(null);
      setError("User not found or an error occurred.");
    }
  };

  return (
    <div>
      <h1>Get joke By ID</h1>
      <Form>
        <Form.Group controlId="userIdInput">
          <Form.Label>Joke ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user ID"
            value={userId}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={fetchData}>
          Fetch User Data
        </Button>
      </Form>
      {userData && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userData).map(([key, value]) => (
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

export default JokeById;
