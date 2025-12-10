import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./component/Navbar";
import NavbarUser from "./component/NavbarUser";
import NavbarAdmin from "./component/NavbarAdmin";
import Footer from "./component/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Ticket from "./pages/Ticket";

import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddEvents from "./pages/AddEvents";

const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "User") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;;
};

export default function App() {
  const [role, setRole] = useState(null);
const updateRole = (newRole) => {
  setRole(newRole);
};

  useEffect(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setRole(parsed?.role ?? null);
      }
  }, []);

  return (
    <>
      {/* Auto updates when role changes */}
      {role === "Admin" ? (
        <NavbarAdmin />
      ) : role === "User" ? (
        <NavbarUser />
      ) : (
        <Navbar />
      )}

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/login" element={<Login onLogin={updateRole} />} />
        <Route path="/register" element={<Register />} />

        {/* dashboards */}
        <Route path="/userdashboard" element={
          <UserRoute><UserDashboard /></UserRoute>
        } />
        <Route path="/admindashboard" element={
          <AdminRoute><AdminDashboard /></AdminRoute>
        } />
        <Route 
  path="/addevent" 
  element={
    <AdminRoute>
      <AddEvents />
    </AdminRoute>
  }
/>

      </Routes>

      <Footer />
    </>
  );
}
