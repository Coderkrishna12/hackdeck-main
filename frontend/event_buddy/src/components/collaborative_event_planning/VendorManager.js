// VendorManager.js
import React, { useState } from 'react';
import VendorForm from './VendorForm';
import VendorList from './VendorList';
// import './VendorManager.css'; // Import your CSS styles Vhere
import '../collaborative_event_planning/VendorManager.css';

const VendorManager = () => {
  const [vendors, setVendors] = useState([]);

  const addVendor = (newVendor) => {
    setVendors([...vendors, newVendor]);
    alert("Vendor added successfully!"); // Alert for successful addition
  };

  return (
    <div className="vendor-container">
      <h1>Vendor Management</h1>
      <VendorForm addVendor={addVendor} />
      <VendorList vendors={vendors} />
    </div>
  );
};

export default VendorManager;
