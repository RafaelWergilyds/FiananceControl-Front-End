import './global.css'
import { Router } from './routes/Router'
import { AuthProvider } from './context/AuthProvider'

export function App() {
  return (
    <>
      <AuthProvider>
        <Router>
        </Router>
      </AuthProvider>
    </>
  )
}