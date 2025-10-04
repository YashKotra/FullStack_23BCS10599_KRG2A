import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import First from "../src/first";
import Third from "../src/third";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav>
          <Link to="/first" style={{ marginRight: "10px" }}>
            First
          </Link>
          <Link to="/third">Third</Link>
        </nav>

        <hr />
        <Routes>
          <Route path="/first" element={<First />} />
          <Route path="/third" element={<Third />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
