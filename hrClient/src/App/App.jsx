import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "../components/Users";
import CreateUser from "../components/CreateUser";
import UpdateUser from "../components/UpdateUser";
import OneUSer from "../components/OneUser";
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
          {/* <Route path="/employees/:id" element={<UpdateUser />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/:id" element={<OneUSer />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
