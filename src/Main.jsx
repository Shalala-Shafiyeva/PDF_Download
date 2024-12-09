import React from "react";
import { Link } from "react-router-dom";
// import "./style.css";


function Main() {
  return (
    <div className="main-container">
      <div className="wrapper">
        <Link to="/create" className="btn create">Create new Presentation</Link>
        <Link to="/view" className="btn view">View Last Preentation</Link>
      </div>
    </div>
  );
}

export default Main;
