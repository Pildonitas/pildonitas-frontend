import Navbar from './components/navbar/navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Form from './components/Form.jsx'
import Home from './pages/Home.jsx'
import './App.css'

const App = () =>{

  return (
    <>
      <Navbar/>
      <main>
      <Outlet/>
      </main> 
      <Footer/>
    </>
  )
}

export default App
