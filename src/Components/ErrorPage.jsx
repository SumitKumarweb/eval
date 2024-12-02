import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    let navigate = useNavigate()
    setTimeout(()=>{
        navigate('/')
    },3000)
  return (
    <div>
        <Navbar/>
        <span style={{fontSize:'30px'}}>page not Found</span>
    </div>
  )
}
