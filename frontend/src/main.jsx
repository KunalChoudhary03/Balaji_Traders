import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CartProvider>
      <App />
      <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover={false}
      theme="colored"
    />
    </CartProvider>
  </BrowserRouter>
)
