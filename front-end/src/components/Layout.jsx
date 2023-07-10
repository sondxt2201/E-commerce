import React from 'react';
import { Outlet, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ToastContainer />
        </>
    )
}

export default Layout