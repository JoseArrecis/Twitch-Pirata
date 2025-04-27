import { NotFound } from "./pages/NotFound";
import {AuthPage} from './pages/Auth/AuthPage.jsx'

export const routes = [
        //ruta     //Página a buscar
    {path: '/', element: <AuthPage/>},
    {path: '/home', element: <AuthPage />},
    {path: '*', element: <AuthPage />}
]