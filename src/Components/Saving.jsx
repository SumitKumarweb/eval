import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';

function Saving() {
    const [loading, setLoading] = useState(true);
    const [showAllTransactions, setShowAllTransactions] = useState({ income: {}, expense: {} });
    const fetchAllTransactions = async () => {
        try {
          let responseIncome = await axios.get('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/income.json');
          let responseExpense = await axios.get('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/expense.json');
          
          setShowAllTransactions({
            income:responseIncome.data,
            expense:responseExpense.data
          })
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      useEffect(()=>{
        fetchAllTransactions()
      },[])




      function calculateSaving(){
        let sumIncome = 0;
        Object.entries(showAllTransactions.income).forEach(([key,entry])=>{
            sumIncome += Number(entry.amount)
        })
        let sumExpense = 0;
        Object.entries(showAllTransactions.expense).forEach(([key,entry])=>{
            sumExpense += Number(entry.amount)
        })
        return {sumIncome  , sumExpense}
      }

  return (
    <div>
        <Navbar/>
        <h1>Saving Transactions</h1>
        {
            showAllTransactions ? (
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(showAllTransactions.income).map(([key, entry]) => (
                            <tr key={key}>
                                <td>{entry.type}</td>
                                <td>{entry.description}</td>
                                <td>{entry.amount}</td>
                                <td>{entry.category}</td>
                                <td>{entry.date}</td>
                            </tr>
                        ))}
                        {Object.entries(showAllTransactions.expense).map(([key, entry]) => (
                            <tr key={key}>
                                <td>{entry.type}</td>
                                <td>{entry.description}</td>
                                <td>{entry.amount}</td>
                                <td>{entry.category}</td>
                                <td>{entry.date}</td>
                            </tr>
                        ))}

                        <tr>
                            <td colSpan={2}>Saving</td>
                            <td>
                                {
                                    calculateSaving().sumIncome - calculateSaving().sumExpense
                                }
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Saving Percentage</td>
                            <td>
                                {
                                    Math.floor((calculateSaving().sumIncome - calculateSaving().sumExpense)/calculateSaving().sumExpense)+ '%'
                                }
                            </td>
                        </tr>
                    </tbody>
            </table>

            ) 
            :
            (
                <h2>not data</h2>
            )
        }
    </div>
  )
}

export default Saving