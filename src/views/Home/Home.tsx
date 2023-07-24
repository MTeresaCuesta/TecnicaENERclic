// DEPENDENCIES
import React from "react";
// COMPONENTS
import { BarChart } from "../../components/BarChart/BarChart";
// STYLES
import "./Home.css";

export function Home() {
  return (
    <div className="home">
      <h2 className="welcome">WELCOME</h2>
      <div style={{ margin: "30px", marginLeft: "5px" }}>
        <p>Home</p>

        <BarChart />
      </div>
    </div>
  );
}
