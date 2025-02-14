"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "../../../components/GradientButton";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const router = useRouter();
  
  const [status, setStatus] = useState({
    loading: true,
    emailValidated: false,
    message: "Verificando seu e-mail...",
  });

  useEffect(() => {
    const fetchApiUrlAndVerify = async () => {
      try {
        const response = await axios.get("/api");
        const apiUrl = response.data.apiUrl;

        if (!token || typeof token !== "string") {
          setStatus({
            loading: false,
            emailValidated: false,
            message: "Token não fornecido.",
          });
          return;
        }

        const result = await verifyEmail(apiUrl, token);
        setStatus(result);
      } catch (_) {
        setStatus({
          loading: false,
          emailValidated: false,
          message: "Ocorreu um erro no sistema.",
        });
      }
    };

    fetchApiUrlAndVerify();
  }, [token]);

  const verifyEmail = async (apiUrl: string, token: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/verify`,
        { token },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 204) {
        return { message: "Seu e-mail foi confirmado!", emailValidated: true, loading: false };
      } else {
        throw new Error(`Erro: ${response.status}`);
      }
    } catch (error) {
      let errorMessage = "Ocorreu um erro desconhecido.";

      if (axios.isAxiosError(error) && error.response) {
        switch (error.response.status) {
          case 406:
            errorMessage = "Token inválido";
            break;
          case 408:
            errorMessage = "Tempo de espera excedido";
            break;
          case 422:
            errorMessage = "Erro de validação";
            break;
          case 500:
            errorMessage = "Erro interno do servidor: Falha ao verificar o usuário";
            break;
        }
      }

      return { message: errorMessage, emailValidated: false, loading: false };
    }
  };

  const handleLoginRedirect = () => {
    router.push("/");
  };

  const handleSignUpRedirect = () => {
    router.push("/signup");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.95)]">
      <div className="relative w-full min-h-screen h-full flex flex-col items-center justify-center px-[5vw] sm:px-[10vw] md:px-[15vw] lg:px-[20vw] overflow-hidden">
        <div className="absolute z-[-1] w-full h-full flex justify-center items-center">
          <div
            className="md:hidden h-full bg-cover bg-no-repeat w-full transform scale-x-[-1] z-0"
            style={{
              backgroundImage: "url('/images/identidade-visual/Ativo-11linhas.png')",
              opacity: 0.90,
            }}
          ></div>

          <div
            className="hidden md:block bg-cover bg-no-repeat transform scale-x-[-1] z-0 w-full h-[20vw]"
            style={{
              backgroundImage: `url('/images/identidade-visual/Ativo-6.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg py-6 px-6 sm:py-8 sm:px-8 max-w-[90%] md:max-w-[600px] w-full shadow-black">
          <h1 className="text-[24px] sm:text-[28px] font-semibold text-[#2F2B3D]/[90%] mb-4 text-center mt-4">
            {status.loading ? "Verificando seu e-mail. Aguarde, por favor..." : status.message}
          </h1>
          
          {!status.loading && (
            <div className="mt-4">
              {status.emailValidated ? (
                <div>
                  <p className="text-[16px] sm:text-[18px] text-[#2F2B3D]/[70%] mb-1 text-center">
                    Seu cadastro foi validado com sucesso!
                  </p>
                  <p className="text-[16px] sm:text-[18px] text-[#2F2B3D]/[70%] mb-8 text-center">
                    Faça login e acesse nossa plataforma.
                  </p>
                  <Button onClick={handleLoginRedirect} className="mb-4 p-2">
                    Login
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-[16px] sm:text-[18px] text-[#2F2B3D]/[70%] mb-1 text-justify">
                    Pedimos desculpa, infelizmente ocorreu um erro e seu cadastro não foi validado.
                  </p>
                  <p className="text-[16px] sm:text-[18px] text-[#2F2B3D]/[70%] mb-8 text-justify">
                    Clique no botão para tentarmos enviar outro e-mail de verificação.
                  </p>
                  <Button onClick={handleSignUpRedirect} className="mb-4 p-2">
                    Enviar e-mail
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
