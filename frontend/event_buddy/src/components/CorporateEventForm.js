import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig'; 
import { storage, db } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const CorporateEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    companyName: '',
    venue: '',
    description: '',
    date: '',
    eventType: 'corporateEvent',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a unique ID for the event
      const uniqueId = uuidv4();
      // Save corporate event with the unique ID to 'corporateEvents' collection
      await addDoc(collection(db, 'corporateEvents'), { ...formData, id: uniqueId });
      alert('Corporate event added successfully!');

      // Reset form
      setFormData({ eventName: '', companyName: '', venue: '', description: '', date: '', eventType: 'corporateEvent' });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Corporate Event Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Event Name: </label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Enter event name"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Company Name: </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Venue: </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Enter venue"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Date: </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CorporateEventForm;
