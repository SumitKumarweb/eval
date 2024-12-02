import React, { useEffect, useState } from 'react'
import './Income.css'
import axios from 'axios'
import Navbar from '../Navbar'
function Income() {
    const [showIncomeEntries , setShowIncomeEntries] = useState({})
    const [updateIncomeMsg ,setUpdateIncomeMsg] = useState(null)
    const [income, setIncome] = useState({
        amount: '',
        description: '',
        category: '',
        date: '',
        type:'Income'
    })

    let fetchIncomeEntries = async ()=>{
        let response = await axios.get('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/income.json')
        setShowIncomeEntries(response.data)
    }

    useEffect(()=>{
        fetchIncomeEntries()
    },[income])

    const addFirebaseData = async (income)=>{
        try{
            await axios.post('https://masai-auth-4bdc9-default-rtdb.firebaseio.com/income.json',income)
            setIncome({
                amount: '',
                description: '',
                category: '',
                date: '',
                type:'Income'
            })
            setUpdateIncomeMsg('Income updated')
            setTimeout(()=>{
                setUpdateIncomeMsg(null)
            },3000)
        }catch(error){
            console.log(error ,'error addFirebaseData')
        }
    }

    function handleSubmitIncome(e) {
        e.preventDefault()
        addFirebaseData(income)
    }

    return (
        <div id='formIncome'>
            <Navbar/>
            <form onSubmit={handleSubmitIncome}>
                <div>
                    <label htmlFor="amount">Amount :</label>
                    <input value={income.amount} onChange={(e) => setIncome((prev) => ({ ...prev, amount: e.target.value }))} type="number" placeholder='Enter Amount' />
                </div>
                <div>
                    <label htmlFor="description">Description :</label>
                    <input value={income.description} onChange={(e) => setIncome((prev) => ({ ...prev, description: e.target.value }))} type="text" placeholder='Enter Description' />
                </div>
                <div>
                    <label htmlFor="category">Category :</label>
                    <input value={income.category} onChange={(e) => setIncome((prev) => ({ ...prev, category: e.target.value }))} type="text" placeholder='Enter Category' />
                </div>
                <div>
                    <label htmlFor="date">Date :</label>
                    <input value={income.date} onChange={(e) => setIncome((prev) => ({ ...prev, date: e.target.value }))} type="date" />
                </div>
                <button type='submit'>Submit</button>
            </form>
            <div>{updateIncomeMsg}</div>
            <div>
                <h1>Show Income Entries</h1>
                <div id='incomeCardDate'>
                    {
                        showIncomeEntries ? Object.entries(showIncomeEntries).map(([key,entry])=>{
                            return (
                                <div key={key}>
                                    <h4>{entry.type}</h4>
                                    <span>Amount : {entry.amount}</span>
                                    <span>Category : {entry.category}</span>
                                    <span>Date : {entry.date}</span>
                                    <span>Description : {entry.description}</span>
                                </div>
                            )
                        })
                        :
                        (
                            <h4>No Data Available</h4>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Income
