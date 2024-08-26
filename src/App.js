import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./Routing/Navigation";
import Layout from "./Screens/Layout";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Appointment from "./Screens/Appointment";
import SignUp from "./Screens/SignUp";
import ForgetPassword from "./Components/ForgetPassword";
import Dashboard from "./Screens/Dashboard";
import AppointmentForm from "./Screens/AppointmentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/AppointmentForm" element={<AppointmentForm />} />

          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
