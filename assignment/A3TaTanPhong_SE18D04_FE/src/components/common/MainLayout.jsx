import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 py-4">
        <Container>
          {/* Outlet sẽ render component của các trang tương ứng với Route */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
