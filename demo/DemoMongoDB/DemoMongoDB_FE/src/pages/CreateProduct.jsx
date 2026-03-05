import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import ProductForm from '../components/ProductForm'
import productService from '../services/productService'

const CreateProduct = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true)
      setError(null)
      await productService.createProduct(formData)
      navigate('/')
    } catch (err) {
      setError('Failed to create product. Please try again.')
      console.error('Error creating product:', err)
      setIsLoading(false)
    }
  }

  return (
    <>
      {error && (
        <Alert variant="danger" className="m-4">
          {error}
        </Alert>
      )}
      <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  )
}

export default CreateProduct
