import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';
import { storage, db } from './firebaseConfig';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

const BirthdayForm = () => {
  const [formData, setFormData] = useState({
    birthdayPerson: '',
    venue: '',
    date: '',
    description: '',
    eventType: 'birthday',
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
      // Save birthday event with the unique ID to 'birthdayEvents' collection
      await addDoc(collection(db, 'birthdayEvents'), { ...formData, id: uniqueId });
      alert('Birthday event added successfully!');

      // Reset form
      setFormData({ birthdayPerson: '', venue: '', date: '', description: '', eventType: 'birthday' });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Birthday Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Birthday Person: </label>
          <input
            type="text"
            name="birthdayPerson"
            value={formData.birthdayPerson}
            onChange={handleChange}
            placeholder="Enter birthday person's name"
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

        <button type="submit" style={{ padding: '10px 20px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BirthdayForm;
