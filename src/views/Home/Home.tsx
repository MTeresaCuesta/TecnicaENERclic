// COMPONENTS
import { Form } from "../../components/Form/Form";
import { Graphics } from "../../components/Graphics/Graphics";
// STYLES
import "./Home.css";

export function Home() {
  return (
    <div className="home">
      <img className="fondoLogin" src="/assets/images/login/fondoLogin.png" alt="" />

      <h2>FORMULARIO</h2>
      <div style={{ margin: "30px", marginLeft: "5px" }}>
        <p>Home</p>
        <Form />
        <Graphics />
      </div>
    </div>
  );
}
