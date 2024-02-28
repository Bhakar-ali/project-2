import React, { useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';

function RandomUser() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchRandomUser = async () => {
    try {
      const apiUrl = 'http://localhost:8080/api/v1/public/randomusers/user/random';
      const response = await axios.get(apiUrl);
      setUser(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching random user:', error);
      setUser(null);
      setError('Error fetching random user.');
    }
  };

  return (
    <div>
      <h1>Random User</h1>
      <Button variant="primary" onClick={fetchRandomUser}>
        Get Random User
      </Button>
      {user && (
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{user.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>{user.website}</td>
            </tr>
          </tbody>
        </Table>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default RandomUser;
