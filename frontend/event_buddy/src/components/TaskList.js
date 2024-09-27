import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TaskList() {
  const { eventId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${eventId}/tasks`)
      .then((response) => {
        setTasks(response.data.tasks);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, [eventId]);

  return (
    <div>
      <h2>Tasks for Event</h2>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.taskId} className="list-group-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {task.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
