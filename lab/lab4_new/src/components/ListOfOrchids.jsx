import React from "react";
import { Table, Container, Button, Image, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { useOrchids } from "../hooks/useOrchids";

export default function ListOfOrchids() {
  const { orchids, loading, deleteOrchid } = useOrchids();

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container>
      <Table striped bordered hover className="mt-5 shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Hình ảnh</th>
            <th>Tên Orchid</th>
            <th>Nguồn gốc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orchids.map((o) => (
            <tr key={o.id}>
              <td>
                <Image
                  src={o.image}
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                  rounded
                />
              </td>
              <td>{o.orchidName}</td>
              <td>
                {o.isNatural ? (
                  <span className="badge bg-success">Tự nhiên</span>
                ) : (
                  <span className="badge bg-warning">Công nghiệp</span>
                )}
              </td>
              <td>
                <Link
                  to={`/edit/${o.id}`}
                  className="btn btn-sm btn-primary me-2"
                >
                  Sửa
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteOrchid(o.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
