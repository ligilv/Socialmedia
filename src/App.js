import React from "react";
import "./App.css";
import Parent from "./Components/Parent";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Parent />
      </Router>
    </div>
  );
}

export default App;
