"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '../../../components/GradientButton';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const VerifyEmail = () => {
    const { token } = useParams(); 
    const router = useRouter();
    const [message, setMessage] = useState('Verificando seu e-mail...');
    const [loading, setLoading] = useState(true);

    const verifyEmail = async (token: string) => {
        try {
            const response = await fetch(`${apiUrl}/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            if (response.ok) {
                setMessage("E-mail confirmado!");
            } else {
                const result = await response.json();
                setMessage(`Falha na verificação: ${result.message}`);
            }
        } catch (error) {
            if (error instanceof Error) {
                setMessage("Ocorreu um erro: " + error.message);
            } else {
                setMessage("Ocorreu um erro desconhecido.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && typeof token === 'string') {
            console.log("Token encontrado:", token);
            verifyEmail(token);
        } else {
            console.log("Token não fornecido");
            setMessage("Token não fornecido.");
            setLoading(false);
        }
    }, [token]); 

    const handleLoginRedirect = () => {
        router.push("/"); 
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-[rgb(255,255,255,0.9)] text-center px-4"
            // style={{ backgroundImage: 'url("/images/verify-background.png")' }} 
        >
            <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md"> 
                <h1 className="text-2xl font-bold text-gray-700 mb-4">
                    {loading ? "Verificando seu e-mail. Aguarde, por favor..." : message}
                </h1>
                {!loading && (
                    <Button
                        onClick={handleLoginRedirect}
                        className="mt-5 w-full sm:w-auto px-6 py-2"
                    >
                        Login
                    </Button>
                )}
            </div>
        </div>
    );
    
    
    
};

export default VerifyEmail;
