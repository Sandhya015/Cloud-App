// src/components/TaskForm.js

import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName) return;

    try {
      await axios.post('http://localhost:5000/tasks', {
        name: taskName,
        completed: false,
      });
      setTaskName('');
      fetchTasks(); // Fetch updated tasks
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Add a new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Add Task</button>
    </form>
  );
};

// Basic styles for form elements
const formStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const inputStyle = {
  flex: '1',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginRight: '10px',
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default TaskForm;
