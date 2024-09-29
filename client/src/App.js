import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTask = () => {
    axios.post('http://localhost:5000/tasks', { title: newTask })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.log(err));
    setNewTask('');
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={newTask} onChange={e => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
