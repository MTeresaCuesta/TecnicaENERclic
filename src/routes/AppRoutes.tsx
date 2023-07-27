// DEPENDENCIES
import { useContext } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// COMPONENTS
import { Login } from "../views/Login/Login";
import { Home } from "../views/Home/Home";
// CONTEXT
import { AppContext } from "../context/AppContext";

const RedirectToLogin = () => {
  const navigate = useNavigate();
  navigate("/");
  return null;
};

export const AppRoutes = () => {
  const { isLogged } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {isLogged && <Route path="/home" element={<Home />} />}
        <Route element={<RedirectToLogin />} />
      </Routes>
    </BrowserRouter>
  );
};
