import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './routes.jsx'

//Componente exportado por defecto
function App() {
  const elements = useRoutes(routes)
  return (
    <>
      { elements }
    </>
  )
}

export default App
