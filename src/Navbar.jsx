import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
    let navigate = useNavigate()
    function handleNavigation(path){
        navigate(path)
    }
  return (
    <nav>
        <button onClick={()=>handleNavigation('/')}>Home</button>
        <button onClick={()=>handleNavigation('/income')}>Income</button>
        <button onClick={()=>handleNavigation('/expense')}>Expense</button>
        <button onClick={()=>handleNavigation('/saving')}>Saving</button>
        <button onClick={()=>handleNavigation('/Transactions')}>Transactions</button>
    </nav>
  )
}

export default Navbar