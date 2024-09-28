import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const AddTask = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
    assignedTo: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the task to the database
      const response = await axios.post(`http://localhost:5000/events/${eventId}/tasks`, taskData);
      
      // Get task ID from the response
      const newTaskId = response.data.taskId;

      // Send email invite if assignedTo (email) is provided
      if (taskData.assignedTo) {
        await axios.post('http://localhost:5000/send-invite', {
          email: taskData.assignedTo,
          eventId: eventId,
          taskId: newTaskId,
        });
      }
      
      // Redirect to tasks page after successful task addition and email invite
      navigate(`/events/${eventId}/tasks`);
    } catch (error) {
      console.error("Error adding task or sending invite:", error);
      setError("Failed to add task or send invite. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Task for Event ID: {eventId}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={taskData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="assignedTo">Assigned To (Email)</label>
          <input
            type="email"
            className="form-control"
            id="assignedTo"
            name="assignedTo"
            value={taskData.assignedTo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
