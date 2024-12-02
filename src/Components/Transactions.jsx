import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cardTransactionsData.css';
import Navbar from '../Navbar';
import { useTransactions } from '../Context/Data';
function Transactions() {
  const [showDeleteMsg, setShowDeleteMsg] = useState(null);
  const [sorting, setSorting] = useState({
    transactions: 'All',
    amount: 'All',
    date: 'all',
  });
  const { allTransactions, fetchAllTransactions, loading } = useTransactions();

  useEffect(() => {
    fetchAllTransactions();
  }, [showDeleteMsg, sorting]);

  const deleteTransaction = async (id, type) => {
    try {
      const url = `https://masai-auth-4bdc9-default-rtdb.firebaseio.com/${type}/${id}.json`;
      await axios.delete(url);

      setShowDeleteMsg('Deleted Transaction');
      setTimeout(() => setShowDeleteMsg(null), 3000);
      fetchAllTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleChange = (val, identity) => {
    setSorting((prev) => ({ ...prev, [identity]: val }));
  };

  const filterTransactions = (transactions, type) => {
    if (sorting.transactions !== 'All' && sorting.transactions !== type) return [];

    return Object.entries(transactions || {}).filter(([_, entry]) => {
      if (sorting.amount !== 'All') {
        const [min, max] = sorting.amount.split(' - ').map(Number);
        if ((min && entry.amount < min) || (max && entry.amount > max)) return false;
      }
      if (sorting.date !== 'all' && entry.date !== sorting.date) return false;
      return true;
    });
  };

  if (loading) return <div>Loading transactions...</div>;

  const incomeData = filterTransactions(allTransactions.income, 'income');
  const expenseData = filterTransactions(allTransactions.expense, 'expense');

  return (
    <div>
      <Navbar />
      <h1>All Transactions</h1>
      <div>
        <select onChange={(e) => handleChange(e.target.value, 'transactions')}>
          <option>All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select onChange={(e) => handleChange(e.target.value, 'amount')}>
          <option>All</option>
          <option>0 - 1000</option>
          <option>1001 - 5000</option>
          <option>5001 - 10000</option>
          <option>10000+</option>
        </select>
        <input type="date" onChange={(e) => handleChange(e.target.value, 'date')} />
      </div>
      <h4>{showDeleteMsg}</h4>
      <div id="showAllTransaction">
        {[{ data: incomeData, type: 'income' }, { data: expenseData, type: 'expense' }].map(({ data, type }) => (
          <div id="cardTransactionsData" key={type}>
            {data.length > 0 ? (
              data.map(([key, entry]) => (
                <div key={key}>
                  <h3>{entry.type}</h3>
                  <span>Amount: {entry.amount}</span>
                  <span>Category: {entry.category}</span>
                  <span>Date: {entry.date}</span>
                  <span>Description: {entry.description}</span>
                  <button onClick={() => deleteTransaction(key, type)}>Delete</button>
                </div>
              ))
            ) : (
              <h2>No {type} data found</h2>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
