import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080'

const productService = {
  getAllProducts: () => {
    return axios.get(`${API_BASE_URL}/products`)
  },

  getProductById: (id) => {
    return axios.get(`${API_BASE_URL}/products/${id}`)
  },

  createProduct: (productData) => {
    return axios.post(`${API_BASE_URL}/products`, productData)
  },

  updateProduct: (id, productData) => {
    return axios.put(`${API_BASE_URL}/products/${id}`, productData)
  },

  deleteProduct: (id) => {
    return axios.delete(`${API_BASE_URL}/products/${id}`)
  },

  getProductsByBrand: (brand) => {
    return axios.get(`${API_BASE_URL}/products/brand/${brand}`)
  },

  getProductsByCategory: (category) => {
    return axios.get(`${API_BASE_URL}/products/category/${category}`)
  },

  getProductsByPriceRange: (min, max) => {
    return axios.get(`${API_BASE_URL}/products/price`, {
      params: { min, max }
    })
  }
}

export default productService
