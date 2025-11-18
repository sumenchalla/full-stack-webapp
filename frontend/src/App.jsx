import {BrowserRouter,Route, Routes} from 'react-router-dom'
import './App.css'
import UserLayout from "./components/Layout/UserLayout"
import AdminLayout from "./components/Layout/AdminLayout"
import Home from './pages/Home'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {


  return (
    <>
      <Toaster position='top-right'/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
            <Route path='login'  element={<Login />}></Route>
            <Route path='register'  element={<Register />}></Route>
          </Route>
          
          <Route>{/* Admin Layout */}</Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
