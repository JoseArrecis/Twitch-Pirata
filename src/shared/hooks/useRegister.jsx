import React, { useState } from 'react'
import { registerRequest } from '../../services/api'

//Hook personalizado para:
//Manejo de lógica de conexión del api
export const useRegister = () => {
    //Aun consulta al api o ya respondio el api
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const register = async(email, username, password)=>{
        setIsLoading(true)
        const user = {
            email,
            username,
            password
        }
        const response = await registerRequest(user)
        setIsLoading(false)
        if(response.error){
            setError(true)
            if(response?.error?.response?.data?.errors){
                let arrayErrors = response?.error?.response?.data?.errors
                for (const error of arrayErrors){
                    return console.log(error.msg)
                }
            }
            return console.log(
                response?.error?.response?.data?.errors ||
                response?.error?.data?.msg ||
                'Error general al intentar registrar al usuario. Intenta de nuevo'
            )
        }
        setError(false)
        return console.log('TODO GOOD')
    }
    return {
        register,
        isLoading,
        error,
        setError
    }
}
