import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import ExpensesTable from "./ExpensesTable";
import "./Home.css";
import AddExpenseModal from "./AddExpenseModal";
const API = process.env.REACT_APP_API_URL;

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState("");
  useEffect(() => {
    setloggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    // console.log("Token:", localStorage.getItem("token"));
    handleSuccess("User Logged Out Successfully :)");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  // const [product, setproduct] = useState([])
  const [expense, setexpense] = useState([]);
  const fetchExpenses = async () => {
    try {
      const url = `${API}/expenses`;
      const response = await fetch(url, {
        headers: { authorization: localStorage.getItem("token") },
      });
      if (response.status === 403) {
        return navigate("/login");
      }
      const result = await response.json();
      // console.log(result);
      setexpense(result.data);
    } catch (err) {
      handleError(err);
    }
  };
  const addExpense = async () => {
    try {
      const response = await fetch(`${API}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ text, amount }),
      });

      const result = await response.json();

      if (result.success) {
        handleSuccess("Expense added");

        // refresh list
        fetchExpenses();

        // reset form
        setText("");
        setAmount("");
        setShowForm(false);
      }
    } catch (err) {
      handleError(err);
    }
  };
  const deleteExpense = async (expenseId) => {
    try {
      const response = await fetch(
        `${API}/expenses/${expenseId}`,
        {
          method: "DELETE",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
      );

      const result = await response.json();

      if (result.success) {
        handleSuccess("Expense deleted");

        // refresh list
        fetchExpenses();
      }
    } catch (err) {
      handleError(err);
    }
  };
  const totalExpense = expense.reduce((sum, item) => {
    return sum + Number(item.amount);
  }, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchExpenses();
  }, []);
  return (
    <div className="home-container">
      <div className="top-bar">
        <h1 className="main-heading">Expense Tracker</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="welcome-section">
        <h3>Welcome, {loggedInUser}</h3>
      </div>
      <div className="summary-box">
        <h3>Total Expense</h3>
        <h3
          style={{
            color: totalExpense >= 0 ? "green" : "red",
          }}
        >
          ₹{totalExpense}
        </h3>
      </div>
      <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Expense</button>

      {showForm && (
        <AddExpenseModal
          text={text}
          setText={setText}
          amount={amount}
          setAmount={setAmount}
          setShowForm={setShowForm}
          addExpense={addExpense}
        />
      )}

      <div className="expTable">
        <ExpensesTable expense={expense} deleteExpense={deleteExpense} />
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
