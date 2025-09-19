import Navbar from './components/navbar/navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import './App.css'

const App = () =>{

  return (
    <>
      <Navbar/>
      
      <Outlet/>
      
      <Footer/>
    </>

  )
}

export default App
