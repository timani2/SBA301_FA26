import { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'

const ProductForm = ({ onSubmit, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    stock: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        brand: initialData.brand || '',
        category: initialData.category || '',
        price: initialData.price || '',
        stock: initialData.stock || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="card p-4">
        <h2 className="mb-4">{initialData ? 'Edit Product' : 'Create New Product'}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand *</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category *</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price *</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              step="0.01"
              min="0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock *</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
              min="0"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : (initialData ? 'Update Product' : 'Create Product')}
            </Button>
            <Button variant="secondary" type="reset">
              Clear
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default ProductForm
