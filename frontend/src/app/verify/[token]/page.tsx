"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'; // Importe useParams
import Button from '../../../components/GradientButton';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const VerifyEmail = () => {
    const { token } = useParams(); // Use useParams para obter o token
    const router = useRouter();
    const [message, setMessage] = useState('Verificando seu e-mail...');
    const [loading, setLoading] = useState(true);

    const verifyEmail = async (token) => {
        try {
            const response = await fetch(`${apiUrl}/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            const result = await response.json();
            if (response.ok) {
                setMessage("E-mail confirmado!");
            } else {
                setMessage(`Falha na verificação: ${result.message}`);
            }
        } catch (error) {
            setMessage("Ocorreu um erro: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Verifique se o token existe
        if (token) {
            console.log("Token encontrado:", token);
            verifyEmail(token);
        } else {
            console.log("Token não fornecido");
            setMessage("Token não fornecido.");
            setLoading(false);
        }
    }, [token]); // Apenas o token como dependência

    const handleLoginRedirect = () => {
        router.push("/"); // Redireciona para a página de login
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className={`text-2xl font-bold ${loading ? "text-gray-500" : "text-green-600"}`}>
                {loading ? "Verificando seu e-mail. Aguarde, por favor..." : message}
            </h1>
            {!loading && (
                <Button
                    onClick={handleLoginRedirect}
                    className="mt-5 px-4 py-2"
                >
                    Login
                </Button>
            )}
        </div>
    );
};

export default VerifyEmail;
