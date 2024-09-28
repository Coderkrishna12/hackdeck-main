// ExpenseForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from './firebaseConfig';


const ExpenseForm = ({ addExpense }) => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = {
      product,
      price: Number(price),
    };

    try {
      // Add the new expense to Firestore
      await addDoc(collection(db, 'expenses'), newExpense);

      // Add the new expense locally
      addExpense(newExpense);

      alert('Expense added successfully!');
      setProduct('');
      setPrice('');
    } catch (error) {
      console.error('Error adding expense: ', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product:
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
