import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import OneUSer from "./components/OneUSer";
import SignUp from "./components/SignUp";
import LoginForm from "./components/LogIn";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/allemployees" element={<Users />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
          <Route path="/:id" element={<OneUSer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
