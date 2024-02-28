import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/todos?query=reactjs&complete=false');
        setTodos(response.data.data); // Assuming response.data contains the array of todos
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todos Table</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo._id}>
              <td>{todo._id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.dueDate}</td> {/* Assuming you have a dueDate field */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TodoList;
