"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../../components/GradientButton";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface ResetPasswordValues {
  new_password: string;
}

const validationSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial")
    .required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("new_password"), undefined], "As senhas devem corresponder")
    .required("Confirmação de senha é obrigatória"),
});

interface ResetPasswordProps {
  params: { token: string }; // Recebendo token como prop
}

const ResetPassword = ({ params }: ResetPasswordProps) => {
  const { token } = params;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {

    const fetchApiUrl = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      setApiUrl(data.apiUrl);
    };

    fetchApiUrl();

    if (token) {
      console.log("Token encontrado:", token);
    } else {
      console.log("Token não fornecido");
      setMessage("Token não fornecido.");
      setLoading(false);
    }
  }, [token]);

  const handleSubmit = async (values: ResetPasswordValues) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/reset-password`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setMessage("Senha redefinida com sucesso! Faça login com sua nova senha.");
      }
    } catch (error: any) {
      const errorMsg = error.response?.status === 404
        ? "Token inválido ou expirado. Preencha novamente seu e-mail em 'Esqueci minha senha' na tela de login"
        : "Ocorreu um erro. Tente novamente mais tarde.";
      setMessage(errorMsg);
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
            Redefinir Senha
          </h1>
          <p className="text-md text-gray-600 text-center mb-6">
            Insira e confirme sua nova senha abaixo.
          </p>

          <Formik
            initialValues={{ new_password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (

              <Form className="w-full space-y-6">
                <div className="relative mb-6">
                    <div className="relative ">
                    <Field
                        name="new_password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nova Senha"
                        className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        style={{
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            border: 'none',
                        }}                    />
                    <span
                        className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-700" />
                        )}                  </span>
                    </div>
                    <ErrorMessage name="new_password" component="div" className="absolute text-red-500 text-sm top-full " />

                </div>
                
                <div className = "relative mb-6">
                    <div className="relative ">
                        <Field
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirmar Nova Senha"
                            className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            style={{
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                border: 'none',
                            }}
                        />
                    <span
                        className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                        ) : (
                            <EyeIcon className="h-5 w-5 text-gray-700" />
                        )}                    
                        </span>
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="absolute text-red-500 text-sm top-full" />
                </div>

                

                {message && <p className="text-center text-[14px] text-gray-700 mb-4">{message}</p>}

                <Button type="submit" className="w-full py-2 mt-3" disabled={isSubmitting || loading}>
                  {loading ? 'Enviando...' : 'Redefinir Senha'}
                </Button>

                <div className="text-center mt-3 mb-2">
                  <Link href="/" className="text-md text-[#103768] hover:font-semibold">
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

export default ResetPassword;
