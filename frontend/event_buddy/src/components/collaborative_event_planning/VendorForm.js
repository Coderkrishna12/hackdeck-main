// VendorForm.js
import React, { useState } from 'react';

const VendorForm = ({ addVendor }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVendor = {
      name,
      type,
      contact,
      notes,
      rating: parseInt(rating),
    };
    addVendor(newVendor);

    // Reset form fields
    setName('');
    setType('');
    setContact('');
    setNotes('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Type (e.g., Florist, Caterer):</label>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <label>Contact:</label>
      <input
        type="text"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
      <label>Notes:</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <label>Rating (1 to 5):</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <button type="submit">Add Vendor</button>
    </form>
  );
};

export default VendorForm;
