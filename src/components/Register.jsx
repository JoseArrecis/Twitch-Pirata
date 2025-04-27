import React, {useState} from "react";
import { Input } from './Input.jsx'
import { useRegister } from "../shared/hooks/useRegister.jsx";

//Formularios no controlado
    /* 
        No lo maneja React, se maneja con el DOM nativo
        Maneja el dodument <- no controlado
    */
//Formularios controlador
    /*
        Lo maneja react (estados), maneja DOM Virtual
        useState <- formulario
    */

export const Register = () =>{

    const form = {
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        passwordConfirm: {
            value: '',
            isValid: false,
            showError: false
        }
    }
    const [formData, setFormData] = useState(form)
    //Importar hook personalizado
    const { register, isLoading, error, setError } = useRegister()

    const handleRegister = (e)=>{
        e.preventDefault()
        register(
            formData.email.value,
            formData.username.value,
            formData.password.value
        )
    }

    //Función manejadora de cambios del estado
    const handleValueChange = (value, field)=>{
        setFormData((prevData)=> (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
        console.log(formData)
    }
    return (
        <div className="register-container">
            <form 
                id="formulario"
                className="auth-form"
                onSubmit={handleRegister}
            >
                <Input 
                    field='email'
                    label='Email'
                    value={formData.email.value}
                    type='email'
                    onChangeHandler={handleValueChange}
                />

                <Input 
                    field='username'
                    label='Username'
                    value={formData.username.value}
                    type='text'
                    onChangeHandler={handleValueChange}
                />

                <Input 
                    field='password'
                    label='Password'
                    value={formData.password.value}
                    type='password'
                    onChangeHandler={handleValueChange}
                />

                <Input 
                    field='passwordConfirm'
                    label='Password Confirmation'
                    value={formData.passwordConfirm.value}
                    type='password'
                    onChangeHandler={handleValueChange}
                />
                <button type="submit">Enviar</button>    
            </form>
        </div>
    )
}