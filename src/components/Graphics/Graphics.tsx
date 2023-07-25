// DEPENDENCIES
import { useContext } from "react";
// CONTEXT
import { AppContext } from "../../context/AppContext";
// COMPONENTS
import Bar from "../Bar/Bar";

export const Graphics = () => {
  const { graphics } = useContext(AppContext);
  if (graphics.length === 0) return <h4>Select one</h4>;
  return (
    <div>
      <div>Graphics</div>
      {graphics.map((graphic: any) => (
        <Bar key={graphic.id} graphic={graphic} />
      ))}
    </div>
  );
};
