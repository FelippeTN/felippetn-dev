import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TccPage from './pages/TccPage'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TccPage />
  </StrictMode>,
)
