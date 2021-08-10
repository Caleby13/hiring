import React from 'react'
import Routes from './routes'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {GlobalStyle} from './styles/GlobalStyle'

const App: React.FC = () => (
  <BrowserRouter>
    <Routes />
    <GlobalStyle />
    <ToastContainer position="bottom-right" />
  </BrowserRouter>
)

export default App
