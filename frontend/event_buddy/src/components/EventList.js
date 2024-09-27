import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      <Link to="/create-event" className="btn btn-primary my-3">
        Create New Event
      </Link>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.eventId} className="list-group-item">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <Link to={`/events/${event.eventId}/tasks`} className="btn btn-info">
              View Tasks
            </Link>
            <Link to={`/events/${event.eventId}/add-task`} className="btn btn-success mx-2">
              Add Task
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
