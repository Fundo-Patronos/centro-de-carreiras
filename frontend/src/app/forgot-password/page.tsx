"use client";

import { useState } from 'react';
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from '../../components/GradientButton';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ForgotPasswordValues {
  user_email: string;
}

const validationSchema = Yup.object().shape({
  user_email: Yup.string()
    .email('Formato de email inválido')
    .required('Email é obrigatório'),
});

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ForgotPasswordValues) => {
    setLoading(true);
    try {

      const response = await axios.post(`${apiUrl}/forgot-password`, values);

      if (response.status === 200) {
        setMessage('Verifique seu e-mail para redefinir sua senha.');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setMessage('Email não encontrado. Verifique e tente novamente.');
      } else {
        setMessage('Ocorreu um erro. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgb(255,255,255,0.95)]">
        <div className="relative w-full min-h-screen h-full flex flex-col items-center justify-center px-[10vw] sd:px-[15vw] md:px-[20vw] overflow-hidden">

            <div
                className="absolute w-[50%] h-[100vw] z-[-1]"
                style={{
                backgroundImage: `url('/images/identidade-visual/Ativo-10linhas.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: 'rotate(90deg)',
                }}
            ></div>

            <div className="bg-white rounded-lg shadow-lg py-8 px-20 sm:py-6 sm:px-12 max-w-[60%] md:max-w-[500px] w-full">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center mt-4">
                Esqueceu sua senha?
                </h1>
                <p className="text-md text-gray-600 text-center mb-6">
                Insira seu email que enviaremos um email para recuperar sua conta.
                </p>

                <Formik
                initialValues={{ user_email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ isSubmitting }) => (
                    <Form className="w-full">
                    <div className="mb-4">
                        <label htmlFor="user_email" className="block text-md text-black mb-1">
                        Email
                        </label>
                        <Field
                        name="user_email"
                        type="email"
                        className="w-full p-3 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        style={{
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            border: 'none',
                        }}
                        />
                        <ErrorMessage
                        name="user_email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    {message && (
                        <p className="text-center text-md text-gray-700 mb-4">
                        {message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full py-2 mt-3"
                        disabled={isSubmitting || loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar'}
                    </Button>

                    <div className="text-center mt-3 mb-2">
                        <Link
                        href="/"
                        className="text-md text-[#103768] hover:text-[#103768] hover:font-semibold"
                        >
                        Voltar ao Login
                        </Link>
                    </div>
                    </Form>
                )}
                </Formik>
            </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
