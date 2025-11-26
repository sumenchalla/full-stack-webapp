import {BrowserRouter,Route, Routes} from 'react-router-dom'
import './App.css'
import UserLayout from "./components/Layout/UserLayout"

import Home from './pages/Home'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionsPage from './pages/CollectionsPage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import MyOrderPage from './pages/MyOrderPage'
import AdminLayout from './components/Admin/AdminLayout.jsx'
import AdminHomePage from './pages/AdminHomePage.jsx'
import UserManagement from './components/Admin/UserManagement.jsx'
import ProductManagement from './components/Admin/ProductManagement.jsx'
import EditProductPage from './components/Admin/EditProductPage.jsx'
import OrderManagement from './components/Admin/OrderManagement.jsx'

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
            <Route path='profile'  element={<Profile />}></Route>
            <Route path='collections/:collection'  element={<CollectionsPage />}></Route>
            <Route path='product/:id'  element={<ProductDetails />}></Route>
            <Route path='checkout'  element={<Checkout />}></Route>
            <Route path='order-confirmation'  element={<OrderConfirmationPage />}></Route>
            <Route path='orders/:id'  element={<OrderDetailsPage />}></Route>
            <Route path='my-orders'  element={<MyOrderPage />}></Route>
          </Route>
          
          <Route path='/admin'  element={<AdminLayout />}>
            <Route index element={<AdminHomePage/>} /> 
            <Route path='users' element={<UserManagement/>}/>
            <Route path='products' element={<ProductManagement/>}/>
            <Route path='orders' element={<OrderManagement/>}/>
            <Route path='products/:id/edit' element={<EditProductPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
