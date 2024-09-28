// VendorList.js
import React from 'react';

const VendorList = ({ vendors }) => {
  return (
    <div>
      <h2>Vendor List</h2>
      <ul>
        {vendors.map((vendor, index) => (
          <li key={index}>
            <h3>{vendor.name}</h3>
            <p>Type: {vendor.type}</p>
            <p>Contact: {vendor.contact}</p>
            <p>Notes: {vendor.notes}</p>
            <p>Rating: {vendor.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorList;
