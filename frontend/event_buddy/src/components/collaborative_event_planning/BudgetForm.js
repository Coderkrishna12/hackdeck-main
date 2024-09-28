// BudgetForm.js
import React, { useState } from 'react';

const BudgetForm = ({ setBudget }) => {
  const [newBudget, setNewBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudget(Number(newBudget));  // Update the total budget in the parent component
    alert(`Budget set to $${newBudget}`);
    setNewBudget('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Set Total Budget:
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          required
        />
      </label>
      <button type="submit">Set Budget</button>
    </form>
  );
};

export default BudgetForm;
