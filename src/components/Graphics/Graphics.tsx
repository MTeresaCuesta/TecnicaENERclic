// DEPENDENCIES
import { useContext } from "react";
// CONTEXT
import { AppContext } from "../../context/AppContext";
// COMPONENTS
import Bar from "../Bar/Bar";

import "./Graphics.css";

export const Graphics = () => {
  const { graphics } = useContext(AppContext);
  if (graphics.length === 0) return <h4 className="ChooseOne">Choose one</h4>;
  return (
    <div>
      <div className="Graphics">Graphics</div>
      {graphics.map((graphic: any) => (
        <Bar
          key={graphic.id}
          graphic={graphic}
        />
      ))}
    </div>
  );
};
