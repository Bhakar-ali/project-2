import React, { useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

function GetBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:8080/api/v1/public/books?page=1&limit=10&inc=kind%2Cid%2Cetag%2CvolumeInfo&query=tech`;
      const response = await axios.get(apiUrl);
      setBooks(response.data.data.data); // Assuming 'items' contains book data
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBooks([]);
      setError("Error fetching books.");
    }
  };

  return (
    <div>
      <h1>Get Books</h1>
      <Button variant="primary" onClick={fetchData}>
        Fetch Books Data
      </Button>
      {books && books.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author(s)</th>
              <th>Publisher</th>
              <th>Published Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.volumeInfo.title}</td>
                <td>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}</td>
                <td>{book.volumeInfo.publisher}</td>
                <td>{book.volumeInfo.publishedDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default GetBooks;
