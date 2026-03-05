import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Alert, Spinner, Container } from 'react-bootstrap'
import ProductForm from '../components/ProductForm'
import productService from '../services/productService'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await productService.getProductById(id)
      setProduct(response.data)
    } catch (err) {
      setError('Failed to load product. Please try again.')
      console.error('Error fetching product:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true)
      setError(null)
      await productService.updateProduct(id, formData)
      navigate('/')
    } catch (err) {
      setError('Failed to update product. Please try again.')
      console.error('Error updating product:', err)
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  return (
    <>
      {error && (
        <Alert variant="danger" className="m-4">
          {error}
        </Alert>
      )}
      {product && (
        <ProductForm
          onSubmit={handleSubmit}
          initialData={product}
          isLoading={isSubmitting}
        />
      )}
    </>
  )
}

export default EditProduct
