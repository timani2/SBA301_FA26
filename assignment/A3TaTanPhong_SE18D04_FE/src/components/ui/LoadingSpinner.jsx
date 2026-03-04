import { Spinner, Container } from "react-bootstrap";

/**
 * Thành phần hiển thị biểu tượng đang tải (Loading)
 * Được sử dụng trong các trang Home, ManageRooms, vv. khi đang chờ dữ liệu từ API.
 */
const LoadingSpinner = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "200px" }}
    >
      <div className="text-center">
        <Spinner
          animation="border"
          role="status"
          variant="primary"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Đang tải dữ liệu...</span>
        </Spinner>
        <p className="mt-3 text-muted fw-bold">
          Vui lòng đợi trong giây lát...
        </p>
      </div>
    </Container>
  );
};

export default LoadingSpinner;
