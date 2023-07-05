import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import Orders from './pages/Orders';
import Customers from './pages/Customers';

import Addblog from './pages/Addblog';
import Bloglist from './pages/Bloglist';

import Addblogcat from './pages/Addblogcat';
import Blogcatlist from './pages/Blogcatlist';

import Addcolor from './pages/Addcolor';
import Colorlist from './pages/Colorlist';

import Addcat from './pages/Addcat';
import Categorylist from './pages/Categorylist';

import Addbrand from './pages/Addbrand';
import Brandlist from './pages/Brandlist';

import Addproduct from './pages/Addproduct';
import Productlist from './pages/Productlist';

import Addcoupon from './pages/Addcoupon';
import Couponlist from './pages/Couponlist';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<Resetpassword />} />
        <Route path='/forgot-password' element={<Forgotpassword />} />
        <Route path='/admin' element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='orders' element={<Orders />} />
          <Route path='customers' element={<Customers />} />

          {/* Blog */}
          <Route path='blog' element={<Addblog />} />
          <Route path='blog-list' element={<Bloglist />} />
          <Route path='blog-category-list' element={<Blogcatlist />} />
          <Route path='blog-category' element={<Addblogcat />} />

          {/* Color */}
          <Route path='color' element={<Addcolor />} />
          <Route path='color-list' element={<Colorlist />} />

          {/* Category */}
          <Route path='category' element={<Addcat />} />
          <Route path='category-list' element={<Categorylist />} />

          {/* Brand */}
          <Route path='brand' element={<Addbrand />} />
          <Route path='brand-list' element={<Brandlist />} />

          {/* Product */}
          <Route path='product' element={<Addproduct />} />
          <Route path='product-list' element={<Productlist />} />

          {/* Coupon */}
          <Route path='coupon' element={<Addcoupon />} />
          <Route path='coupon-list' element={<Couponlist />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
