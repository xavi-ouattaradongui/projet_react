import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Editor from "./Component/Editor";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route vers le tableau de bord */}
        <Route path="/" element={<Dashboard />} />

        {/* Route vers l'éditeur Markdown */}
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;

