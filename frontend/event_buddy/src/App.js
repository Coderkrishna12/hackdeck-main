import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="text-center my-4">Event Planner</h1>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:eventId/tasks" element={<TaskList />} />
          <Route path="/events/:eventId/add-task" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
