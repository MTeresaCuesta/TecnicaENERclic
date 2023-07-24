// DEPENDENCIES
import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// COMPONENTS
import { Login } from '../views/Login/Login';
import { Home } from '../views/Home/Home';
// CONTEXT
import { AppContext } from '../context/AppContext';


export const AppRoutes = () => {
  const { isLogged } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        {!isLogged && <Route path='/' element={<Login />} />}
        {isLogged && <Route path='/home' element={<Home />} />}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  );
}