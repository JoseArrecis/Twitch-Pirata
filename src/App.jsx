import { BrowserRouter, useRoutes } from 'react-router-dom'
import { routes } from './routes.jsx'
import { Toaster } from 'react-hot-toast'

//Componente exportado por defecto
function App() {
  const elements = useRoutes(routes)
  return (
    <>
      { elements }
      <Toaster position='bottom-rigth' reverseOrder={false}/>
    </>
  )
}

export default App
