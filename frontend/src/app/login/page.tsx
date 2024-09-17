"use client";

import { useState } from 'react';
import Button from '../../components/Button';
import Link from 'next/link';
import { useValidationEmail } from '../../hooks/validation';
import InputField from '../../components/InputField';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const { emailError, validateEmail } = useValidationEmail();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        validateEmail(email);
        if (!emailError) {
            console.log('Formulário enviado com sucesso!');
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (email.includes('@')) {
            validateEmail(email);
        }
    };

    const handleEmailBlur = (e) => {
        validateEmail(e.target.value); 
    };

    return (
        <div className="min-h-screen flex">
            {/* HERO */}
            <div className="w-2/3 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
                <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold text-white">Bem-vindo ao Nosso Site</h1>
                </div>
            </div>

            {/* LOGIN FORM */}
            <div className="w-1/3 flex flex-col items-center justify-center bg-white p-8">

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bem-vindo ao Centro de Carreiras</h2>
                <p className="text-md text-gray-600 mb-6">Por favor entre com sua conta para iniciar a sessão</p>

                <h1 className="text-4xl font-bold text-black mb-6">Login</h1>

                <form className="w-full" onSubmit={handleSubmit}>

                    <InputField type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} errorMessage={emailError} />

                    <InputField type={showPassword ? 'text' : 'password'} placeholder="Senha" showPasswordToggle onPasswordToggle={() => setShowPassword(!showPassword)}/>

                    <div className="text-center mb-6">
                        <a href="#" className="text-blue-500 hover:text-blue-700">
                            Esqueceu sua senha?
                        </a>
                    </div>

                    <Button>Login</Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">Novo na plataforma?</p>
                    <Link href="/signup" legacyBehavior>
                        <a className="text-blue-500 hover:text-blue-700 font-semibold">
                            Cadastre-se
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
