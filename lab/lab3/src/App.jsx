// src/App.jsx
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Orchid from "./page/Orchid";
import About from "./page/About";
import Contact from "./page/Contact";
import OrchidDetail from "./page/OrchidDetail";
// import { OrchidsData } from "./data/ListOfOrchidss"; // khong dung import cai nay nua vi
import ManageOrchid from "./page/ManageOrchid";
import Login from "./page/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            {/* CODE CŨ: <Route index element={<Orchid orchidList={OrchidsData} />} /> */}
            {/* CODE MỚI: Không cần truyền prop orchidList nữa vì Orchid tự gọi API */}
            <Route index element={<Orchid />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="detail/:id" element={<OrchidDetail />} />
            {/* them trang quan ly orchid cho admin */}
            <Route path="manage" element={<ManageOrchid />} />{" "}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
