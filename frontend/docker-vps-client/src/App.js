import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Board from "./Board";
import Logout from "./components/Logout";
import Unauthorized from "./components/Unauthorized";
import Missing from "./components/Missing";

function App() {
  // data-bs-theme="dark"
  return (
    <div className="App h-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/board" element={<Board />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* catch all */}
        <Route path="/*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
