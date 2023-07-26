// COMPONENTS
import { Form } from "../../components/Form/Form";
import { Graphics } from "../../components/Graphics/Graphics";
// STYLES
import "./Home.css";

export function Home() {
  return (
    <div className="fondoForm">
      <div>
        <Form />

        <Graphics />
      </div>
    </div>
  );
}
