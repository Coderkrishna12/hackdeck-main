import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../src/components/collaborative_event_planning/Header";
import Home from "../src/components/collaborative_event_planning/Home";
// import About from "./MyComponents/About";
import Events from "../src/components/collaborative_event_planning/Events"; // New Events Component
import WeddingForm from "../src/components/collaborative_event_planning/WeddingForm"; // Import your new components
import BirthdayForm from "../src/components/collaborative_event_planning/BirthdayForm";
import CorporateEventForm from "../src/components/collaborative_event_planning/CorporateEventForm";
import CollegeFestForm from "../src/components/collaborative_event_planning/CollegeFestForm";
// import EventForm from "../src/components/collaborative_event_planning/EventForm";
import CreateCustomEvent from "../src/components/collaborative_event_planning/CreateCustomEvent";
import Profile from "../src/components/collaborative_event_planning/Profile";
import YourEvents from "../src/components/collaborative_event_planning/YourEvents";
import YourCollaborators from "../src/components/collaborative_event_planning/YourCollaborators";
import Logout from "../src/components/collaborative_event_planning/Logout";
import Chat from "../src/components/collaborative_event_planning/Chat";

function App() {
  return (
    <Router>
      <Header title="EventBuddy" searchBar={true} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route exact path="/about" element={<About />} /> */}
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/wedding" element={<WeddingForm />} />{" "}
        {/* New Route */}
        <Route exact path="/birthday" element={<BirthdayForm />} />{" "}
        {/* New Route */}
        <Route
          exact
          path="/corporateEvent"
          element={<CorporateEventForm />}
        />{" "}
        {/* New Route */}
        <Route exact path="/collegeFest" element={<CollegeFestForm />} />{" "}
        {/* New Route */}
        {/* <Route exact path="/event-form" element={<EventForm />} /> */}
        <Route path="/createCustomEvent" element={<CreateCustomEvent />} />
        <Route path="/" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/your-events" element={<YourEvents />} />
        <Route path="/your-collaborators" element={<YourCollaborators />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/chat" element={<Chat />} /> {/* Add Chat Route */}
      </Routes>
    </Router>
  );
}

export default App;
