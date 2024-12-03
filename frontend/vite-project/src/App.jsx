import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ViewUsers from "./pages/ViewUsers";

function App() {
  return (
    <Router>
      <div style={{ padding: "10px", backgroundColor: "#f8f8f8" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Dashboard
        </Link>
        <Link to="/view-users">View Users</Link>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/view-users" element={<ViewUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
