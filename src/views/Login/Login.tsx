// DEPENDENCIES
import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
// CONTEXT
import { AppContext } from "../../context/AppContext";
// HANDLERS
import { loginHandler } from "../../server/handlers/login-handlers";
// STYLES
import "./Login.css";

export function Login() {
  const { setIsLogged } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    const { username, password } = state;
    if (username !== "" && password !== "") {
      loginHandler(username, password).then(() => {
        setIsLogged(true);
        navigate("/home");
      });
    }
  };

  return (
    <div className="divPpal">
      <img className="fondoLogin" src="/assets/images/login/fondoLogin.png" alt="" />
      <div className="login">
        <h2 className="welcome">WELCOME</h2>
        <div style={{ margin: "30px", marginLeft: "5px" }}>
          <TextField name="username" label="Username:" variant="standard" onChange={handleChange} />
          <TextField name="password" label="Your password:" variant="standard" onChange={handleChange} />
          <br />
          <Button variant="outlined" onClick={handleClick}>
            Login
          </Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p>Or Sign Up Using</p>
          <div style={{ marginTop: "60px" }}>
            <img className="imagenesRrs" src="/assets/images/login/IconTwitter.png" alt="" />
            <img className="imagenesRrs" src="/assets/images/login/IconFacebook.png" alt="" />
            <img className="imagenesRrs" src="/assets/images/login/IconInstagram.png" alt="" />
            <img className="imagenesRrs" src="/assets/images/login/IconWhatsapp.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
