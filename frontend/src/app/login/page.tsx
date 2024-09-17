"use client";

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import Button from '../../components/Button';
import Link from 'next/link';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Área da esquerda com a imagem/hero */}
            <div className="w-2/3 bg-cover bg-center" style={{ backgroundImage: "placeholder" }}>
                <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
                    <h1 className="text-5xl font-bold text-white">Bem-vindo ao Nosso Site</h1>
                </div>
            </div>

            {/* Área da direita com o formulário */}
            <div className="w-1/3 flex flex-col items-center justify-center bg-white p-8">
                {/* Frases de boas-vindas */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Bem-vindo ao Centro de Carreiras</h2>
                <p className="text-md text-gray-600 mb-6">Por favor entre com sua conta para iniciar a sessão</p>

                <h1 className="text-4xl font-bold text-black mb-6">Login</h1>

                <form className="w-full">
                    {/* Campo de Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:text-black"
                    />

                    {/* Campo de Senha com olho para mostrar/ocultar */}
                    <div className="relative w-full mb-6">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Senha"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:text-black"
                        />
                        <div
                            className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-6 w-6 text-gray-600" />
                            ) : (
                                <EyeIcon className="h-6 w-6 text-gray-600" />
                            )}
                        </div>
                    </div>

                    {/* Link "Esqueceu sua senha?" */}
                    <div className="text-right mb-6">
                        <a href="#" className="text-blue-500 hover:text-blue-700">
                            Esqueceu sua senha?
                        </a>
                    </div>

                    <Button>Login</Button>
                </form>

                {/* Seção "Novo na plataforma?" com link para cadastro */}
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
