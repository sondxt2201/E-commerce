import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GetFullDateMinuteString } from './utils/Utility';
import Layout from './components/Layout';
import Home from './pages/Home';

let time = GetFullDateMinuteString(new Date());

function App() {
  { console.log("Website run at: " + time) }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />}>

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
