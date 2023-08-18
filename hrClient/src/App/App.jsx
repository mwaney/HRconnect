import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "../components/Users";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/employees" element={<Users />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
