import './App.css'
import Layput from './components/Layouts/Layput'
import AddProducts from './components/screens/dashboard/AddProducts'
import Edit from './components/screens/dashboard/Edit'
import Home from './components/screens/dashboard/Home'
import Orders from './components/screens/dashboard/Orders'
import Products from "./components/screens/dashboard/Products";
import Dashboard from "./components/screens/dashboard/Dashboard";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Distributor from './components/screens/Blog/Distributor'
import NavBar from './components/Layouts/Blog/NavBar'
import Detail from './components/screens/Blog/Detail'
import Login from './components/Authentication/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/screens/dashboard/Profile'
import ForgotPasswordPage from "./components/Authentication/ForgotPasswordPage";
import ResetPasswordPage from "./components/Authentication/ResetPasswordPage.js";
import AccountForm from './components/screens/dashboard/AccountForm.jsx'
import AccountList from './components/screens/dashboard/AccountList.jsx'
function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/distributor" element={<Distributor />} />
            <Route path="/product-detail/:id" element={<Detail />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Layput />}>
              <Route index element={<Dashboard />} />{" "}
              <Route path="products" element={<Products />} />
              <Route path="add-product" element={<AddProducts />} />
              <Route path="create-account" element={<AccountForm />} />
              <Route path="accounts" element={<AccountList />} />
              <Route path="edit-product/:id" element={<Edit />} />
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Edit/> */}
    </>
  );
}

export default App
