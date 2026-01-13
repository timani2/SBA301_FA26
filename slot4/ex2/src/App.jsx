// src/App.jsx
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Orchid from "./components/Orchid";
import About from "./components/About";
import Contact from "./components/Contact";
import OrchidDetail from "./components/OrchidDetail"; // <--- Import file mới
import { OrchidsData } from "./data/ListOfOrchidss";
import TestCount from "./components/TestCount";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Orchid orchidList={OrchidsData} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Thêm Route chi tiết */}
            <Route path="/detail/:id" element={<OrchidDetail />} />
          </Routes>

          <div className="text-center my-3">
            <TestCount />
          </div>
        </main>

        <Footer
          avatar="https://cdn2.fptshop.com.vn/unsafe/800x0/meme_cho_1_e568e5b1a5.jpg"
          name="phongtt"
          email="sw.phongtt@gmail.com"
        />
      </div>
    </Router>
  );
}

export default App;
