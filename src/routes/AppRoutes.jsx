import React from 'react'
import { Login } from '../components/Login';
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export const AppRoutes = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}