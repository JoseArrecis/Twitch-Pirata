import React, { useState } from 'react'
import { registerRequest } from '../../services/api'
import toast from 'react-hot-toast'


//Hook personalizado para:
//Manejo de lógica de la respuesta del api
export const useRegister = () => {
    //Aun consulta al api? o ya respondió el api
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
        if(response?.err?.response?.data?.errors){
            let arrayErrors = response?.err?.response?.data?.errors
            for (const error of arrayErrors) {
                return toast.error(error.msg)
            }
        }
        return toast.error(
            response?.err?.response?.data?.msg ||
            response?.err?.data?.msg ||
            'Error general al intentar registrar al usuario. Intenta de nuevo'
        )
      }
      setError(false)
      return toast.success('TODO GOOD')
    }
  return {
    register,
    isLoading,
    error,
    setError
  }
}