import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./components/MainLayout";
import Orchid from "./page/Orchid";
import About from "./page/About";
import Contact from "./page/Contact";
import OrchidDetail from "./page/OrchidDetail";
import ManageOrchid from "./page/ManageOrchid";
import Login from "./page/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Orchid />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="detail/:id" element={<OrchidDetail />} />
            <Route path="manage" element={<ManageOrchid />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
