import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TaskList = () => {
  const { eventId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/events/${eventId}/tasks`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, [eventId]);

  return (
    <div>
      <h2>Tasks for Event ID: {eventId}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to={`/events/${eventId}/add-task`} className="btn btn-primary mb-3">
        Add Task
      </Link>
      {tasks.length === 0 ? (
        <p>No tasks available for this event.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.taskId} className="list-group-item">
              {task.title} - Status: {task.status}
              <Link to={`/events/${eventId}/tasks/${task.taskId}`} className="btn btn-link">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
