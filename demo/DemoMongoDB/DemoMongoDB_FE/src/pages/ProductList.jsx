import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductTable from '../components/ProductTable'
import productService from '../services/productService'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  // Filter states
  const [brandFilter, setBrandFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // Get unique brands and categories
  const uniqueBrands = [...new Set(products.map(p => p.brand))]
  const uniqueCategories = [...new Set(products.map(p => p.category))]

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [products, brandFilter, categoryFilter, minPrice, maxPrice])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await productService.getAllProducts()
      setProducts(response.data)
    } catch (err) {
      setError('Failed to fetch products. Make sure the backend server is running on http://localhost:8080')
      console.error('Error fetching products:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = async () => {
    try {
      let filtered = [...products]

      // Apply brand filter
      if (brandFilter) {
        filtered = filtered.filter(p => p.brand === brandFilter)
      }

      // Apply category filter
      if (categoryFilter) {
        filtered = filtered.filter(p => p.category === categoryFilter)
      }

      // Apply price range filter
      if (minPrice || maxPrice) {
        const min = minPrice ? parseFloat(minPrice) : 0
        const max = maxPrice ? parseFloat(maxPrice) : Infinity
        filtered = filtered.filter(p => p.price >= min && p.price <= max)
      }

      setFilteredProducts(filtered)
    } catch (err) {
      console.error('Error applying filters:', err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id)
        setProducts(products.filter(p => p.id !== id))
        setSuccessMessage('Product deleted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      } catch (err) {
        setError('Failed to delete product')
        console.error('Error deleting product:', err)
      }
    }
  }

  const resetFilters = () => {
    setBrandFilter('')
    setCategoryFilter('')
    setMinPrice('')
    setMaxPrice('')
  }

  return (
    <Container className="mt-4 mb-5">
      <Row className="mb-4">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col md="auto">
          <Link to="/add">
            <Button variant="success">Add Product</Button>
          </Link>
        </Col>
      </Row>

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}

      {/* Filters Section */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">Filters</h5>
        <Row className="g-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="">All Brands</option>
                {uniqueBrands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </Form.Group>
          </Col>

          <Col md={2} className="d-flex align-items-end">
            <Button
              variant="secondary"
              onClick={resetFilters}
              className="w-100"
            >
              Reset Filters
            </Button>
          </Col>
        </Row>
      </div>

      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
        isLoading={isLoading}
        error={error}
      />
    </Container>
  )
}

export default ProductList
