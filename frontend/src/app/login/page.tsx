"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Button from '../../components/Button';
import Hero from '../../components/Hero';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { validationSchemaLogin } from '../../hooks/validationSchema';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface LoginFormValues {
    email: string;
    password: string;
}

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const router = useRouter(); 

    const handleSubmit = async (values: LoginFormValues, { setSubmitting }: FormikHelpers<LoginFormValues>) => {
        try {
            const response = await fetch('${apiUrl}/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                router.push('/homepage');
            } else {
                setLoginError('Usuário ou senha inválido');
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            setLoginError('Ocorreu um erro. Tente novamente mais tarde.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <Hero />
            {/* LOGIN FORM */}
            <div className="w-1/3 flex flex-col items-center justify-center bg-white p-8">
                <h2 className="text-2xl font-semibold  text-gray-900 mb-2">Bem-vindo ao Centro de Carreiras</h2>
                <p className="text-md text-gray-600 mb-6">Por favor entre com sua conta para iniciar a sessão</p>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchemaLogin}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="w-full">
                            {/* E-MAIL */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-black">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder=""
                                    className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    style={{
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                        border: 'none',
                                    }}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* SENHA */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-black">Senha</label>
                                <div className="relative">
                                    <Field
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder=""
                                        className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                        style={{
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                            border: 'none',
                                        }}
                                    />
                                    <span
                                        className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-700" />
                                        )}
                                    </span>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* ESQUECI MINHA SENHA */}
                            <div className="mb-4 flex justify-between items-center">
                                <div className="flex items-center">
                                    <Field type="checkbox" name="rememberMe" id="rememberMe" className="mr-2"/>
                                    <label htmlFor="rememberMe" className="text-black">Lembrar de mim</label>
                                </div>
                                <Link href="/reset-password" className="text-blue-500 hover:text-blue-700 font-semibold">
                                    Esqueci minha senha
                                </Link>
                            </div>

                            {loginError && (
                                <p className="text-red-500 text-sm mb-4">{loginError}</p>
                            )}

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Login'}
                            </Button>
                        </Form>
                    )}
                </Formik>

                {/* CADASTRE-SE */}
                <div className="mt-6 text-center">
                    <p className="text-black inline">Novo na plataforma? </p>
                    <Link href="/signup" className="text-blue-500 hover:text-blue-700 font-semibold inline">
                        Cadastre-se
                    </Link>
                </div>
            </div>
        </div>
    );
}
