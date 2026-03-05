import { Table, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductTable = ({ products, onDelete, isLoading, error }) => {
  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  if (!products || products.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">No products found. <Link to="/add">Add a new product</Link></Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <Link to={`/edit/${product.id}`}>
                    <Button variant="warning" size="sm" className="me-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default ProductTable
