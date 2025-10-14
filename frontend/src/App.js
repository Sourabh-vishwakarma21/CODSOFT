import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home/index";
import Jobs from "./components/Jobs/index";
import PostJob from "./components/PostJob";
import Candidate from "./components/Dashboard/candidate";
import Employer from "./components/Dashboard/Employer";
import Login from "./components/Auth/login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Job Pages */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/postjob" element={<PostJob />} />

        {/* Dashboards */}
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/employer" element={<Employer />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
