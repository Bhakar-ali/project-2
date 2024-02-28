import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoDetails({ match, history }) {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/todos/648e0741aeefd0cfa40adddd${match.params.id}`);
        console.log(response);
        setTodo(response.data.data);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/todos/${match.params.id}`);
      // Redirect to a different page or perform any other action after successful deletion
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

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
      <p>ID: {todo.id}</p>
      <p>Title: {todo.title}</p>
      <p>Description: {todo.description}</p>
      <p>Due Date: {todo.dueDate}</p>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TodoDetails;
