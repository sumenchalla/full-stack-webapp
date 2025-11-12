import {BrowserRouter,Route, Routes} from 'react-router-dom'
import './App.css'
import UserLayout from "./components/Layout/UserLayout"
import AdminLayout from "./components/Layout/AdminLayout"
import Home from './pages/Home'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />}></Route>
          </Route>
          
          <Route>{/* Admin Layout */}</Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
