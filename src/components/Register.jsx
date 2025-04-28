import React, { useState } from 'react'
import { Input } from './Input'
import { useRegister } from '../shared/hooks/useRegister'
import { emailValidationMessage, passConfirmValidationMessage, passwordValidationMessage, usernameValidationMessage, validateEmail, validatePassConfirm, validatePassword, validateUsername } from '../shared/validators/validator'


//Formularios no controlado
    /*
        No lo maneja React, se maneja con el DOM nativo
        document <- no controlado
     */
//Fromularios controlador
    /* 
        Lo maneja react (estados), maneja DOM Virtual
        useState <- formulario
    */

export const Register = () => {

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

    //Validador para el botón
    const isSubmitButtonDisable =   !formData.email.isValid ||
                                    !formData.username.isValid ||
                                    !formData.password.isValid ||
                                    !formData.passwordConfirm.isValid

    
    const handleRegister = (e)=>{
        e.preventDefault()
        register(
            formData.email.value,
            formData.username.value,
            formData.password.value
        )
    }

    //función específica para validar campos
    const handleValidationOnBlur = (value, field)=>{
        let isValid = false
        switch (field) {
            case 'email':
                isValid = validateEmail(value)
                break;
            case 'username':
                isValid = validateUsername(value)
                break;
            case 'password':
                isValid = validatePassword(value)
                break;
            case 'passwordConfirm':
                isValid = validatePassConfirm(formData.password.value, value)
                break;
            default:
                break;
        }
        setFormData((prevData)=> (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }

    //Función manejadora de cambios del estado
                        //nuevo valor //Input que cambió
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
    <div className='register-container'>
        <form
            id='formulario'
            className='auth-form' 
            onSubmit={handleRegister}
        >
            <Input 
                field='email'
                label='Email'
                value={formData.email.value}
                type='email'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.email.showError}
                validationMessage={emailValidationMessage}
            />

            <Input 
                field='username'
                label='Username'
                value={formData.username.value}
                type='text'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.username.showError}
                validationMessage={usernameValidationMessage}
            />

            <Input 
                field='password'
                label='Password'
                value={formData.password.value}
                type='password'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.password.showError}
                validationMessage={passwordValidationMessage}
            />

            <Input 
                field='passwordConfirm'
                label='Password Confirmation'
                value={formData.passwordConfirm.value}
                type='password'
                onChangeHandler={handleValueChange}
                onBlurHandler={handleValidationOnBlur}
                showErrorMessage={formData.passwordConfirm.showError}
                validationMessage={passConfirmValidationMessage}
            />      
            <button 
                type='submit'
                disabled={isSubmitButtonDisable}
            >
                Enviar
            </button>
        </form>
    </div>
  )
}