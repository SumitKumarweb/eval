import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const TransactionsContext = createContext();
 
export const TransactionsProvider = ({ children }) => {
  const [allTransactions, setAllTransactions] = useState({ income: null, expense: null });
  const [loading, setLoading] = useState(true);

  const fetchAllTransactions = async () => {
    try {
      let responseIncome = await axios.get('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/income.json');
      let responseExpense = await axios.get('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/expense.json');

      setAllTransactions({
        income: responseIncome.data,
        expense: responseExpense.data,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  return (
    <TransactionsContext.Provider value={{ allTransactions, fetchAllTransactions, loading }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
