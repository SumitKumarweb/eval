import React, { useEffect, useState } from 'react'
import './Income.css'
import axios from 'axios'
import Navbar from '../Navbar'
function Expense() {
    const [showExpenseEntries , setShowExpenseEntries] = useState({})
    const [updateExpenseMsg ,setUpdateExpenseMsg] = useState(null)
    const [expense, setExpense] = useState({
        amount: '',
        description: '',
        category: '',
        date: '',
        type:'Expense'
    })

    let fetchExpenseEntries = async ()=>{
        let response = await axios.get('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/expense.json')
        setShowExpenseEntries(response.data)

    }

    useEffect(()=>{
        fetchExpenseEntries()
    },[expense])

    const addFirebaseData = async (expense)=>{
        try{
            await axios.post('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/expense.json',expense)
            setExpense({
                amount: '',
                description: '',
                category: '',
                date: '',
                type:'Expense'
            })
            setUpdateExpenseMsg('Expense updated')
            setTimeout(()=>{
                setUpdateExpenseMsg(null)
            },3000)
        }catch(error){
            console.log(error ,'error addFirebaseData')
        }
    }

    function handleSubmitIncome(e) {
        e.preventDefault()
        addFirebaseData(expense)
    }

    return (
        <div id='formIncome'>
            <Navbar/>
            <form onSubmit={handleSubmitIncome}>
                <div>
                    <label htmlFor="amount">Amount :</label>
                    <input value={expense.amount} onChange={(e) => setExpense((prev) => ({ ...prev, amount: e.target.value }))} type="number" placeholder='Enter Amount' />
                </div>
                <div>
                    <label htmlFor="description">Description :</label>
                    <input value={expense.description} onChange={(e) => setExpense((prev) => ({ ...prev, description: e.target.value }))} type="text" placeholder='Enter Description' />
                </div>
                <div>
                    <label htmlFor="category">Category :</label>
                    <input value={expense.category} onChange={(e) => setExpense((prev) => ({ ...prev, category: e.target.value }))} type="text" placeholder='Enter Category' />
                </div>
                <div>
                    <label htmlFor="date">Date :</label>
                    <input value={expense.date} onChange={(e) => setExpense((prev) => ({ ...prev, date: e.target.value }))} type="date" />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <div>{updateExpenseMsg}</div>
            <div>
                <h1>Show Expense Entries</h1>
                <div id='incomeCardDate'>
                    {
                        showExpenseEntries ? Object.entries(showExpenseEntries).map(([key,entry])=>{
                            return (
                                <div key={key}>
                                    <h4>{entry.type}</h4>
                                    <span>Amount : {entry.amount}</span>
                                    <span>Category : {entry.category}</span>
                                    <span>Date : {entry.date}</span>
                                    <span>Description : {entry.description}</span>
                                </div>
                            )
                        }) :
                        (
                            <h4>No Data Available</h4>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Expense;
