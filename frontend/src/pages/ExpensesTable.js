import "./ExpensesTable.css";

import React from "react";

const ExpensesTable = ({ expense, deleteExpense }) => {
  console.log("expense list : ", expense);

  return (
    <div className="expense-list">
      {expense?.map((exp, idx) => (
        <div key={idx} className="expense-item">
          <div className="expense-description">{exp.text}</div>

          <div
            className="expense-amount"
            style={{
              color: exp.amount > 0 ? "green" : "red",
            }}
          >
            ₹{exp.amount}
          </div>

          <button
            className="delete-button"
            onClick={() => deleteExpense(exp._id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpensesTable;
