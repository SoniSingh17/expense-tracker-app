import React from "react";

const AddExpenseModal = ({
  text,
  setText,
  amount,
  setAmount,
  setShowForm,
  addExpense,
}) => {
  return (
    <div className="modal">
      <input
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="text-btn" onClick={addExpense}>Submit</button>

      <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
    </div>
  );
};

export default AddExpenseModal;
