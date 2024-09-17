import { useState } from 'react';

const ALLOWED_DOMAINS = ['@dac.unicamp.br', '@example.com']; 

export const useValidationEmail = () => {
    const [emailError, setEmailError] = useState('');

    const isEmailValid = (email) => {
        return ALLOWED_DOMAINS.some(domain => email.endsWith(domain));
    };

    const validateEmail = (email) => {
        if (!isEmailValid(email)) {
            setEmailError('* Entre com um email com vínculo com a Unicamp');
        } else {
            setEmailError('');
        }
    };

    return { emailError, validateEmail };
};

export const useValidationPasswords = () => {
    const [passwordsError, setConfirmPasswordsError] = useState('');


    const validatePasswords = (password, confirmPassword) => {
        if ((confirmPassword.length > 0 || password.length > 0) &&  password !== confirmPassword) {
            setConfirmPasswordsError('* As senhas não coincidem');
        }
        else{
            setConfirmPasswordsError('');
        }
    };

    return { passwordsError, validatePasswords };
};


export const useValidationPasswordStrongness = () => {
    const [passwordError, setPasswordError] = useState('');


    const validatePasswordStrongness = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length > 0 && (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar)) {
            setPasswordError('* Senha deve conter caracteres maiúsculos, minúsculos, números e caracteres especiais');
        } else {
            setPasswordError('');
        }
    };

    return { passwordError, validatePasswordStrongness };
};
