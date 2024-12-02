import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import './Home.css';
import {useTransactions}  from '../Context/Data';

function Home() {
  const { allTransactions, fetchAllTransactions } = useTransactions();

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  function calculateSaving() {
    let sumIncome = 0;
    let sumExpense = 0;

    if (allTransactions.income) {
      Object.values(allTransactions.income).forEach((entry) => {
        sumIncome += Number(entry.amount);
      });
    }
    if (allTransactions.expense) {
      Object.values(allTransactions.expense).forEach((entry) => {
        sumExpense += Number(entry.amount);
      });
    }

    return { sumIncome, sumExpense };
  }

  const { sumIncome, sumExpense } = calculateSaving();

  return (
    <div>
      <Navbar />
      <div id="home">
        <span>Total Income: {sumIncome}</span>
        <span>Total Expense: {sumExpense}</span>
        <span>Current Saving: {sumIncome - sumExpense}</span>
        <span>
          Saving Percentage : 
        {Math.floor((sumIncome - sumExpense)/sumExpense) + '%'}
        </span>
      </div>
    </div>
  );
}

export default Home;
