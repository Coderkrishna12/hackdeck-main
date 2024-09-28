// BudgetManager.js
import React, { useState } from 'react';
import './BudgetManager.css';
import BudgetForm from './BudgetForm';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const BudgetManager = () => {
  const [budget, setBudget] = useState(0);            // To store the total budget
  const [expenses, setExpenses] = useState([]);       // To store all the expenses
  const [totalExpenses, setTotalExpenses] = useState(0); // Total expenses calculated
  const [remainingBudget, setRemainingBudget] = useState(0); // Remaining budget after expenses

  // Function to handle setting the budget
  const handleSetBudget = (newBudget) => {
    setBudget(newBudget);
    setRemainingBudget(newBudget - totalExpenses);  // Adjust remaining budget when a new budget is set
  };

  // Function to add a new expense and update total expenses and remaining budget
  const addExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);

    const updatedTotalExpenses = updatedExpenses.reduce((acc, expense) => acc + expense.price, 0);
    setTotalExpenses(updatedTotalExpenses);

    const updatedRemainingBudget = budget - updatedTotalExpenses;
    setRemainingBudget(updatedRemainingBudget);
  };

  return (
    <div>
      <h1>Budget Management</h1>

      {/* Pass the handleSetBudget function to BudgetForm */}
      <BudgetForm setBudget={handleSetBudget} />

      {/* Pass the addExpense function to ExpenseForm */}
      <ExpenseForm addExpense={addExpense} />

      {/* Pass down budget, totalExpenses, and remainingBudget */}
      <ExpenseList 
        budget={budget} 
        totalExpenses={totalExpenses} 
        remainingBudget={remainingBudget}
        expenses={expenses}
        setExpenses={setExpenses}
        setTotalExpenses={setTotalExpenses}
      />
    </div>
  );
};

export default BudgetManager;
