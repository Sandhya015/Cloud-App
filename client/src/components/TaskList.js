// src/components/TaskList.js

import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks(); // Fetch updated tasks
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ul style={listStyle}>
      {tasks.map(task => (
        <li key={task._id} style={listItemStyle}>
          <span>{task.name}</span>
          <button onClick={() => handleDelete(task._id)} style={deleteButtonStyle}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

// Basic styles for list elements
const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
  borderBottom: '1px solid #ccc',
};

const deleteButtonStyle = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default TaskList;
