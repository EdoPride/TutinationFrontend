import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ticket from "./pages/Ticket";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
