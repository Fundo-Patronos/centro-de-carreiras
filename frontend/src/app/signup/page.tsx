"use client";

import { useState } from 'react';
import Button from '../../components/Button';
import Link from 'next/link';
import { useValidationEmail, useValidationPasswords, useValidationPasswordStrongness } from '../../hooks/validation';
import InputField from '../../components/InputField';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [graduationYear, setGraduationYear] = useState('');
    const [course, setCourse] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const { emailError, validateEmail } = useValidationEmail();
    const { passwordsError, validatePasswords } = useValidationPasswords();
    const { passwordError, validatePasswordStrongness} = useValidationPasswordStrongness();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Validate fields
        if (!username || !fullName || !email || !password || !confirmPassword || !graduationYear || !course) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        validateEmail(email);
        validatePasswords(password, confirmPassword);
        validatePasswordStrongness(password);

        if (!passwordsError && !emailError && !passwordError) {
            alert('Formulário enviado com sucesso!');
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


    const handlePasswordConfirmationBlur = (e) => {
        validatePasswords(password, confirmPassword);
    }

    const handlePasswordConfirmationChange = (e) => {
        const confirmPassword = e.target.value;       
        setConfirmPassword(confirmPassword);
        validatePasswords(password, confirmPassword);
        
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;       
        setPassword(password);
        validatePasswordStrongness(password);
        validatePasswords(password, confirmPassword);
        
    };
    

    return (
        <div className="min-h-screen flex">
            {/* HERO */}
            <div className="w-2/3 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
                <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold text-white">Bem-vindo ao Nosso Site</h1>
                </div>
            </div>

            {/* SIGNUP FORM */}
            <div className="w-1/3 flex flex-col items-center justify-center bg-white p-8">

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bem-vindo ao Centro de Carreiras</h2>
                <p className="text-md text-gray-600 mb-6">Por favor entre com sua conta para iniciar a sessão</p>

                <h1 className="text-4xl font-bold text-black mb-6">Cadastre-se</h1>

                <form className="w-full" onSubmit={handleSubmit}>

                    <InputField type="text" placeholder="Nome do Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <InputField type="text" placeholder="Nome Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required />

                    <InputField type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} errorMessage={emailError} required/>

                    <InputField type="text" placeholder="Curso" value={course} onChange={(e) => setCourse(e.target.value)} required />

                    <InputField type="number" placeholder="Ano de Graduação" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} required />

                    <InputField type="text" placeholder="Linkedin (Opcional)" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />

                    <InputField type={showPassword ? 'text' : 'password'} placeholder="Criar Senha" value = {password} showPasswordToggle onPasswordToggle={() => setShowPassword(!showPassword)} onChange={handlePasswordChange}  errorMessage={passwordError} required/>

                    <InputField type={showPassword ? 'text' : 'password'} placeholder="Confirmar Senha" value = {confirmPassword}  showPasswordToggle onChange={handlePasswordConfirmationChange}  onPasswordToggle={() => setShowPassword(!showPassword)} onBlur={handlePasswordConfirmationBlur} errorMessage={passwordsError}  required/>

    
                    <div className="text-center mb-6">
                        <Link href="#" className="text-blue-500 hover:text-blue-700">
                            Esqueceu sua senha?
                        </Link>
                    </div>

                    <Button>Cadastrar</Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">Já possui uma conta?</p>
                    <Link href="/login" className="text-blue-500 hover:text-blue-700 font-semibold">
                        Faça login
                    </Link>
                </div>
            </div>
        </div>
    );
}
