import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function TodoById({ match }) {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/todos/${match.params.id}`);
        setTodo(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (match && match.params.id) {
      fetchTodo();
    }
  }, [match]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!todo) {
    return <p>Todo not found.</p>;
  }

  return (
    <div>
      <h1>Todo Details</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.dueDate}</td>
            <td>{todo.completed ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default TodoById;
