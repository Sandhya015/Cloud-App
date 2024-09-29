require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String (Add it in your .env file for better security)
const mongoUri = 'mongodb+srv://4pa21cs109:rZEEhKRYk0NcoJ3t@cluster0.xzwzu.mongodb.net/todo?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Task model (You may have a separate file for models)
const taskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task({
      name: req.body.name,
      completed: req.body.completed,
    });
    await newTask.save(); // Save new task to the database
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error adding new task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // Delete task by ID
    res.json(deletedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
