import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import ProductList from './pages/ProductList'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  )
}

export default App
