import React, { useState } from 'react';
import { storage, db } from './firebaseConfig'; // Import Firebase config
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase storage methods
import { collection, addDoc } from 'firebase/firestore'; // Firestore methods
import "./EventForm.css";
import '../collaborative_event_planning/firebaseConfig';

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventLogo: null,
    category: '',
    eventName: '',
    description: '',
    mode: 'online',
    country: '',
    state: '',
    city: '',
    location: '',
    participationType: 'individual', // Added for participation
    minParticipants: '',
    maxParticipants: '',
    startDate: '',
    endDate: '',
  });

  const [step, setStep] = useState(1); // Manage step state

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, eventLogo: e.target.files[0] });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2); // Move to next step
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage
    let imageUrl = '';
    if (formData.eventLogo) {
      const storageRef = ref(storage, `logos/${formData.eventLogo.name}`);
      await uploadBytes(storageRef, formData.eventLogo);
      imageUrl = await getDownloadURL(storageRef); // Get download URL after upload
    }

    // Save form data to Firestore
    try {
      await addDoc(collection(db, 'events'), {
        ...formData,
        eventLogo: imageUrl, // Include image URL in Firestore document
      });
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={step === 1 ? handleNext : handleSubmit}>
      {step === 1 && (
        <>
          {/* Logo Upload */}
          <label>Event Logo</label>
          <input type="file" onChange={handleFileChange} accept="image/*" required /> {/* Added required */}

          {/* Category Dropdown */}
          <label>Category</label>
          <select name="category" onChange={handleInputChange} value={formData.category} required>
            <option value="">Select Category</option>
            <option value="college_fests">College Fests</option>
            <option value="corporate_events">Corporate Events</option>
            <option value="birthdays">Birthdays</option>
            <option value="weddings">Weddings</option>
          </select>

          {/* Event Name */}
          <label>Event Name</label>
          <input type="text" name="eventName" onChange={handleInputChange} value={formData.eventName} required />

          {/* Description */}
          <label>Description</label>
          <textarea name="description" onChange={handleInputChange} value={formData.description} required></textarea>

          {/* Mode Selection */}
          <label>Mode</label>
          <div>
            <label>
              <input type="radio" name="mode" value="online" onChange={handleInputChange} checked={formData.mode === 'online'} />
              Online
            </label>
            <label>
              <input type="radio" name="mode" value="offline" onChange={handleInputChange} checked={formData.mode === 'offline'} />
              Offline
            </label>
          </div>

          {/* Conditional Fields for Offline Mode */}
          {formData.mode === 'offline' && (
            <>
              <label>Country</label>
              <input type="text" name="country" onChange={handleInputChange} value={formData.country} />

              <label>State</label>
              <input type="text" name="state" onChange={handleInputChange} value={formData.state} />

              <label>City</label>
              <input type="text" name="city" onChange={handleInputChange} value={formData.city} />

              <label>Location Name</label>
              <input type="text" name="location" onChange={handleInputChange} value={formData.location} />
            </>
          )}

          <button type="submit">Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <label>Participation Type</label>
          <select name="participationType" onChange={handleInputChange} value={formData.participationType} required>
            <option value="individual">Individual</option>
            <option value="team">Team</option>
          </select>

          {formData.participationType === 'team' && (
            <>
              <label>Minimum Participants</label>
              <input type="number" name="minParticipants" onChange={handleInputChange} value={formData.minParticipants} required />

              <label>Maximum Participants</label>
              <input type="number" name="maxParticipants" onChange={handleInputChange} value={formData.maxParticipants} required />
            </>
          )}

          {/* Event Dates */}
          <label>Start Date</label>
          <input type="date" name="startDate" onChange={handleInputChange} value={formData.startDate} required />

          <label>End Date</label>
          <input type="date" name="endDate" onChange={handleInputChange} value={formData.endDate} required />

          <button type="submit">Finish</button>
        </>
      )}
    </form>
  );
};

export default EventForm;
