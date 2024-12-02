import { Route , Routes } from 'react-router-dom'
import './App.css'
import Expense from './Components/Expense'
import Home from './Components/Home'
import Income from './Components/Income'
import Saving from './Components/Saving'
import Transactions from './Components/Transactions'
import ErrorPage from './Components/errorPage'

function App() {

  let routeData = [
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/income',
      element:<Income/>
    },
    {
      path:'/Expense',
      element:<Expense/>
    },
    {
      path:'/saving',
      element:<Saving/>
    },
    {
      path:'/transactions',
      element:<Transactions/>
    },{
      path:'*',
      element:<ErrorPage/>
    }
  ]
  

  return (
    <>
      <Routes>
        {
          routeData.map((route,idx)=>{
            return (
              <Route key={idx} path={route.path} element={route.element}/>
            )
          })
        }
      </Routes>
    </>
  )
}

export default App
