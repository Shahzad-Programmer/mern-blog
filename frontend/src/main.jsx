import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.jsx'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
  <BrowserRouter>
    <App />
<ToastContainer/>
    </BrowserRouter>
    </UserContextProvider>
)
