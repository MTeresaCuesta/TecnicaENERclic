// DEPENDENCIES
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
// CONTEXT
import { AppContext } from "../../context/AppContext";
// COMPONENTS
import Bar from "../Bar/Bar";
import Line from "../Line/Line";
// STYLES
import "./Graphics.css";

export const Graphics = () => {
  const { graphics } = useContext(AppContext);
  const [show, setShow] = useState("Bar");
  const handleClick = () => {
    setShow(show === "Bar" ? "Line" : "Bar");
  };
  if (graphics.data?.length === 0) return <h4 className="ChooseOne">Choose one</h4>;
  return (
    <div>
      <div className="Graphics">Graphics in {show}</div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Change to {show === "Bar" ? "Line" : "Bar"}
      </Button>
      {graphics.data?.map((graphic: any) => {
        if (show === "Bar") return <Bar key={graphic.id} graphic={graphic} />;
        else return <Line key={graphic.id} graphic={graphic} />;
      })}
    </div>
  );
};
