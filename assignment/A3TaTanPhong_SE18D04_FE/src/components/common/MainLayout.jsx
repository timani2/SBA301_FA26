import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      {/* Vùng chứa nội dung các trang (Pages) sẽ render vào đây */}
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
