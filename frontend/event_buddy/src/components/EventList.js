// src/components/EventList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const categories = ["weddingEvents", "birthdayEvents", "corporateEvents", "collegeEvents"];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/events"); // Update with your API endpoint
                setEvents(response.data.events);
                setFilteredEvents(response.data.events); // Default to all events
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filterEvents = (category) => {
        if (category === "all") {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(event => event.category === category);
            setFilteredEvents(filtered);
        }
    };

    if (loading) {
        return <div>Loading events...</div>;
    }

    if (error) {
        return <div>Error fetching events: {error}</div>;
    }

    return (
        <div>
            <h2 className="text-center">Events</h2>
            <div className="text-center my-3">
                <button className="btn btn-primary mx-2" onClick={() => filterEvents("all")}>All Events</button>
                {categories.map((category) => (
                    <button
                        key={category}
                        className="btn btn-outline-primary mx-2"
                        onClick={() => filterEvents(category)}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
            {filteredEvents.length === 0 ? (
                <p>No events available for this category.</p>
            ) : (
                <ul className="list-group">
                    {filteredEvents.map((event) => (
                        <li key={event.eventId} className="list-group-item">
                            <h5>{event.title}</h5>
                            <p>{event.description}</p>
                            <Link to={`/events/${event.eventId}/tasks`} className="btn btn-primary">
                                View Tasks
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;
