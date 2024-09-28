import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();  // useNavigate instead of useHistory
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching event');
        setLoading(false);
      });
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:5000/events/${eventId}`, event)
      .then(response => {
        navigate(`/events`);  // navigate to the events list
      })
      .catch(error => {
        setError('Error updating event');
      });
  };

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate(`/events`)} className="ms-3">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
