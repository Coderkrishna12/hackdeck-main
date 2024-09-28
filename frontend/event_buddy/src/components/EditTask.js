import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
  const { eventId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    assignedTo: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${eventId}/tasks/${taskId}`)
      .then(response => {
        setTask(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching task');
        setLoading(false);
      });
  }, [eventId, taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the task
      await axios.patch(`http://localhost:5000/events/${eventId}/tasks/${taskId}`, task);
      
      // Send email if assignedTo has an email
      if (task.assignedTo) {
        await axios.post('http://localhost:5000/send-invite', {
          email: task.assignedTo,  // Email to send the invite
          eventId: eventId,
          taskId: taskId,
        });
      }
      
      navigate(`/tasks/${eventId}`);
    } catch (error) {
      setError('Error updating task or sending invite');
    }
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div className="container mt-4"><div className="alert alert-info">Loading task details...</div></div>;
  }

  if (error) {
    return <div className="container mt-4"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={task.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="form-control"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="assignedTo">Assigned To (Email):</label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            className="form-control"
            value={task.assignedTo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary ms-3" onClick={() => navigate(`/tasks/${eventId}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTask;
