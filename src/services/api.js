import axios from "axios";

//Configuración básica
const apiClient = axios.create(
    {
        baseURL: 'http://localhost:2656/twitch/v1',
        timeout: 2000
    }
)

//Consulta para registrar usuario
export const registerRequest = async(user)=>{
    try {
        return await apiClient.post('/auth/register', user, {
            //Cabecera especial (Acepta formularios con archivos)
            type: 'multipart/form-data'
        })
    } catch(err) {
        return {
            error: true,
            err
        }
    }
}