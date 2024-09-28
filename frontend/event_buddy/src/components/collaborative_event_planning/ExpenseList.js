// ExpenseList.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from "./firebaseConfig";

const ExpenseList = ({
  budget,
  expenses,
  totalExpenses,
  remainingBudget,
  setExpenses,
  setTotalExpenses,
}) => {
  const [loading, setLoading] = useState(true);

  // Fetch expenses from Firestore
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const expensesArray = [];
        let total = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          expensesArray.push(data);
          total += data.price;
        });

        setExpenses(expensesArray); // Update global expenses state if needed
        setTotalExpenses(total); // Update total expenses
        setLoading(false);
      } catch (error) {
        console.error("Error fetching expenses: ", error);
      }
    };

    fetchExpenses();
  }, [setExpenses, setTotalExpenses]);

  return (
    <div>
      <h2>Expense List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul>
            {totalExpenses > budget ? alert("Budget exceeded!") : null}{" "}
            {/* Alert when budget is exceeded */}
            {expenses.map((expense, index) => (
              <li key={index}>
                {expense.product}: ${expense.price}
              </li>
            ))}
          </ul>
          <h3>Total Expenses: ${totalExpenses}</h3>
          <h3>Budget: ${budget}</h3>
          <h3>Remaining Budget: ${remainingBudget}</h3>
        </>
      )}
    </div>
  );
};

export default ExpenseList;
