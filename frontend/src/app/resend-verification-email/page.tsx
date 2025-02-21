"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../components/GradientButton";
import { useRouter } from 'next/navigation'; 
import AuthPopup from '../../components/AuthPopup';
import { isEmailValid} from '../../hooks/validationSchema';



interface SendVerificationEmailValues {
  user_email: string;
}

const validationSchema = Yup.object().shape({
  user_email: Yup.string()
    .email("Formato de email inválido")
    .required("Email é obrigatório"),
});

const SendVerificationEmail = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const router = useRouter();

  useEffect(() => {

    const fetchApiUrl = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      setApiUrl(data.apiUrl);
    };

    fetchApiUrl();
  });

  const handleSubmit = async (values: SendVerificationEmailValues) => {
    setLoading(true);
    try {

      const response = await axios.post(`${apiUrl}/resend-verification-email`, values);

      if (response.status === 200) {
        setMessage("Acesse seu e-mail para autenticar sua conta.");
        if (isEmailValid(values.user_email)) {
          setIsEmailSent(true);
        } else {
          setIsEmailSent(false);
        }
        setIsPopupOpen(true);
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          setMessage("Email não encontrado. Verifique e tente novamente.");
        } else if (error.response && error.response.status === 406) {
          setMessage("Sua conta já esta verificada. Volte ao Login para acessar a plataforma.");
        } else {
          setMessage("Ocorreu um erro. Tente novamente mais tarde.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-[rgb(255,255,255,0.95)]">
      <div className="relative w-full min-h-screen h-full flex flex-col items-center justify-center px-[2vw] sd:px-[10vw] md:px-[15vw] overflow-hidden">
        <div className="absolute z-[-1] w-full h-full flex justify-center items-center">
            <div
                className="md:hidden h-full bg-cover bg-no-repeat w-full transform scale-x-[-1] z-0"
                style={{
                    backgroundImage: "url('/images/identidade-visual/Ativo-11linhas.png')",
                    opacity: 0.90,
                }}
            ></div>
            
            <div
                className="hidden md:block bg-cover bg-no-repeat transform scale-x-[-1] z-0 w-[100vw] h-[20vw] "
                style={{
                    backgroundImage: `url('/images/identidade-visual/Ativo-6.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>
        </div>




          <div className="bg-white rounded-lg shadow-lg py-6 px-6 sm:py-6 sm:px-8 md:py-8 md:px-20 max-w-[80%] sm:max-w-[60%] md:max-w-[500px] w-full">
              <h1 className="text-md sm:text-lg md:text-2xl font-semibold text-gray-800 mb-4 text-center mt-2 md:mt-4">
                  Precisa reenviar o e-mail de verificação ?
              </h1>
              <p className="text-xs sm:text-sm md:text-md text-gray-600 text-center mb-4 md:mb-6">
                  Insira seu email que enviaremos um email para verificar sua conta.
              </p>

              <Formik
                  initialValues={{ user_email: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
              >
                  {({ isSubmitting }) => (
                      <Form className="w-full">
                          <div className="mb-4">
                              <Field
                                  name="user_email"
                                  placeholder="E-mail"
                                  type="email"
                                  className="w-full p-2 md:p-3 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 sm:text-sm"
                                  style={{
                                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                                      border: "none",
                                  }}
                              />
                              <ErrorMessage
                                  name="user_email"
                                  component="div"
                                  className="text-red-500 text-xs sm:text-sm mt-1"
                              />
                          </div>

                          {message && (
                              <p className="text-center text-xs sm:text-sm md:text-md text-gray-700 mb-4">
                                  {message}
                              </p>
                          )}

                          <Button
                              type="submit"
                              className="w-full py-2 mt-2 md:mt-3 text-xs sm:text-sm md:text-md"
                              disabled={isSubmitting || loading}
                          >
                              {loading ? "Enviando..." : "Enviar"}
                          </Button>


                          <div className="text-center mt-2 md:mt-3 mb-2">
                              <Link
                                  href="/"
                                  className="text-xs sm:text-sm md:text-md text-[#103768] hover:text-[#103768] hover:font-semibold"
                              >
                                  Voltar ao Login
                              </Link>
                          </div>
                      </Form>
                  )}
              </Formik>
          </div>
      </div>
      <AuthPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        emailSent={isEmailSent}
        router={router}
      />
  </div>


  );
};

export default SendVerificationEmail;
