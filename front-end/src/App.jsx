import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Utility from './utils/Utility';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blog from './pages/Blog';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart'
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Signup from './pages/Signup';
import Resetpassword from './pages/Resetpassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermAndConditions from './pages/TermAndContions';
import SingleProduct from './pages/SingleProduct';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Order from './pages/Order';
import Profile from './pages/Profile';

function App() {
  { console.log("Website run at: " + Utility.GetFullDateMinuteString(new Date())) }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />

            {/* blogs */}
            <Route path='blogs' element={<Blog />} />
            <Route path='blog/:id' element={<SingleBlog />} />

            {/* products */}
            <Route path='product' element={<OurStore />} />
            <Route path='product/:id' element={<SingleProduct />} />
            <Route path='compare-product' element={<CompareProduct />} />
            <Route path='wish-list' element={<PrivateRoutes><Wishlist /></PrivateRoutes>} />

            {/* auth */}
            <Route path='login' element={<OpenRoutes><Login /></OpenRoutes>} />
            <Route path='sign-up' element={<OpenRoutes><Signup /></OpenRoutes>} />
            <Route path='forgot-password' element={<Forgotpassword />} />
            <Route path='reset-password/:token' element={<Resetpassword />} />

            {/* information */}
            <Route path='privacy-policy' element={<PrivacyPolicy />} />
            <Route path='shipping-policy' element={<ShippingPolicy />} />
            <Route path='refund-policy' element={<RefundPolicy />} />
            <Route path='term-and-conditions' element={<TermAndConditions />} />

            {/* cart */}
            <Route path='cart' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
            <Route path='check-out' element={<PrivateRoutes><Checkout /></PrivateRoutes>} />

            {/* order */}
            <Route path='user-order' element={<PrivateRoutes><Order /></PrivateRoutes>} />

            {/* profile */}
            <Route path='user-profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
