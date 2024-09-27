import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', assignedTo: '' });

  // Fetch all events on component mount
  useEffect(() => {
    axios.get('/events')
      .then(response => setEvents(response.data.events))
      .catch(error => console.log(error));
  }, []);

  // Fetch tasks for a selected event
  const fetchTasks = (eventId) => {
    setSelectedEventId(eventId);
    axios.get(`/events/${eventId}/tasks`)
      .then(response => setTasks(response.data.tasks))
      .catch(error => console.log(error));
  };

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    axios.post(`/events/${selectedEventId}/tasks`, newTask)
      .then(response => {
        fetchTasks(selectedEventId);  // Refresh task list after adding
        setNewTask({ title: '', description: '', dueDate: '', assignedTo: '' });
      })
      .catch(error => console.log(error));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Event List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.eventId}>
                  <td>{event.eventId}</td>
                  <td>{event.name}</td>
                  <td>
                    <Button onClick={() => fetchTasks(event.eventId)} variant="primary">View Tasks</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col>
          <h2>Tasks for Selected Event</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.taskId}>
                  <td>{task.taskId}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h2>Add New Task</h2>
          <Form onSubmit={addTask}>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter task description" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formTaskDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formTaskAssignedTo">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control type="text" placeholder="Assigned To" value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })} />
            </Form.Group>
            <Button variant="primary" type="submit">Add Task</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EventManagement;
