import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/collaborative_event_planning/Header";
import Home from "../src/components/collaborative_event_planning/Home";
// import About from "./MyComponents/About";
import Events from "../src/components/collaborative_event_planning/Events"; // New Events Component
import Wedding from "../src/components/collaborative_event_planning/Wedding"; // Import your new components
import Birthday from "../src/components/collaborative_event_planning/Birthday";
import CorporateEvent from "../src/components/collaborative_event_planning/CorporateEvent";
import CollegeFest from "../src/components/collaborative_event_planning/CollegeFest";
// import EventForm from "../src/components/collaborative_event_planning/EventForm";


function App() {
  return (
    <Router>
      <Header title="EventBuddy" searchBar={true} />
      <Routes>
        <Route exact path="/" element={<Home />} /> 
        {/* <Route exact path="/about" element={<About />} /> */}
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/wedding" element={<Wedding />} /> {/* New Route */}
        <Route exact path="/birthday" element={<Birthday />} /> {/* New Route */}
        <Route exact path="/corporateEvent" element={<CorporateEvent />} /> {/* New Route */}
        <Route exact path="/collegeFest" element={<CollegeFest />} /> {/* New Route */}
        {/* <Route exact path="/event-form" element={<EventForm />} /> */}
      </Routes>
    </Router>
  );
}

export default App;  