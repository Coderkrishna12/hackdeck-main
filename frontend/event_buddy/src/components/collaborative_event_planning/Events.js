import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Events.css"; // Optional for additional custom styling

export default function Events() {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Card for Internship */}
        <div className="col-md-6 mb-4">
          <Link to="/wedding" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Wedding</h5>
                <p className="card-text">A wedding planner ensure the big day runs smoothly by overseeing the details and logistics, allowing the couple to enjoy a stress-free celebration. With creative ideas and expert planning, a wedding planner crafts unforgettable moments tailored to the couple's unique style and preferences.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card for Learn */}
        <div className="col-md-6 mb-4">
          <Link to="/birthday" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Birthday</h5>
                <p className="card-text">A birthday planner simplifies the entire celebration process by managing everything from venue selection, decorations, and entertainment to guest lists and catering. With personalized themes, attention to detail, and a seamless experience, it ensures a stress-free and unforgettable birthday for all ages.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card for Jobs */}
        <div className="col-md-6 mb-4">
          <Link to="/corporateEvent" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Corporate Event</h5>
                <p className="card-text">A corporate event planner handle everything from venue selection and logistics to catering and entertainment, ensuring a seamless experience that aligns with the company’s goals and brand image. Their expertise helps create impactful, memorable events that foster collaboration, networking, and business growth.</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Card for Compete */}
        <div className="col-md-6 mb-4">
          <Link to="/collegeFest" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">College Fest</h5>
                <p className="card-text">A college fest is a vibrant celebration of talent, creativity, and collaboration, where students come together to showcase their skills across cultural, academic, and technical domains. It fosters camaraderie, provides a platform for networking, and creates unforgettable memories through exciting events, competitions, and performances.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}