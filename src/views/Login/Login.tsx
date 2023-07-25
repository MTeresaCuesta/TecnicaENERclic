// DEPENDENCIES
import { useContext, useState } from "react";
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
  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = () => {
    const { username, password } = state;
    if (username !== "" && password !== "") {
      loginHandler(username, password)
        .then(() => {
          setIsLogged(true);
          navigate("/home");
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("Please fill in all the fields");
    }
  };

  return (
    <div className="divPpal">
      <img className="fondoLogin" src="/assets/images/login/fondoLogin.png" alt="" />
      <img className="iconoNegroUsuario" src="/assets/images/login/IconUser1.png" alt="iconoNegroUsuario" />
      <div className="login">
        <h2 className="welcome">WELCOME</h2>
        <div className="campos">
          <TextField name="username" label="Username:" variant="standard" onChange={handleChange} />
          <TextField
            type="password" // Esta línea define el tipo de campo como contraseña
            name="password"
            label="Your password:"
            variant="standard"
            onChange={handleChange}
            value={state.password}
          />
          <br />
          <br />
          <br />
          <Button className="boton" variant="outlined" onClick={handleClick}>
            Login
          </Button>

          {error && <p className="msgError">{error}</p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p>Or Sign Up Using</p>
          <div style={{ marginTop: "60px" }}>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <img className="imagenesRrs" src="/assets/images/login/IconTwitter.png" alt="Twitter" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <img className="imagenesRrs" src="/assets/images/login/IconFacebook.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <img className="imagenesRrs" src="/assets/images/login/IconInstagram.png" alt="Instagram" />
            </a>
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
              <img className="imagenesRrs" src="/assets/images/login/IconWhatsapp.png" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
