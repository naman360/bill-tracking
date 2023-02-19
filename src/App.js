import React from "react";
import { Bill } from "./components/bill";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Bill />
    </div>
  );
}

export default App;
