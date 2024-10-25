"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Button from "../../../components/GradientButton";


const VerifyEmail = () => {
  const { token } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("Verificando seu e-mail...");
  const [loading, setLoading] = useState(true);
  const [emailValidated, setEmailValidated] = useState(false);
  const [apiUrl, setApiUrl] = useState("");

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
        setMessage("Seu e-mail foi confirmado!");
        setEmailValidated(true);
      } else {
        const result = await response.json();

        if (response.status === 500) {
          setMessage(`Erro no servidor: ${response.status}`);
        } else {
          setMessage(`Falha na verificação: ${result.detail}`);
        }
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

    const fetchApiUrl = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      setApiUrl(data.apiUrl);
    };

    fetchApiUrl();

    if (token && typeof token === "string") {
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
  const handleSignUpRedirect = () => {
    router.push("/signup");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[linear-gradient(to_right,#FF6666,#C964E2)] ">
      {/* Background Image */}
      {/* <div
            className="absolute bg-cover bg-center w-full"
            style={{
                backgroundImage: `url('images/squiggles/squiggle_01.png')`,
                backgroundSize: "cover",
                width: '50%',  
                height: '50%', 
                zIndex: -1,     
            }}
            ></div> */}
      <div className="bg-white rounded-lg shadow-lg py-8 px-8 sm:py-6 sm:px-8 max-w-[90%] md:max-w-[600px] w-full shadow-black">
        <h1 className="text-[28px] font-semibold text-[#2F2B3D]/[90%] mb-6 text-center mt-4">
          {loading ? "Verificando seu e-mail. Aguarde, por favor..." : message}
        </h1>
        {!loading && (
          <div className="mt-4">
            {emailValidated && (
              <div>
                <p className="text-[18px] text-[#2F2B3D]/[70%] mb-1 text-center">
                  Seu cadastro foi validado com sucesso!
                </p>
                <p className="text-[18px] text-[#2F2B3D]/[70%] mb-8 text-center">
                  Faça login e acesse nossa plataforma.
                </p>
                <Button onClick={handleLoginRedirect} className="mb-4 p-2">
                  Login
                </Button>
              </div>
            )}

            {!emailValidated && (
              <div>
                <p className="text-[18px] text-[#2F2B3D]/[70%] mb-1 text-justify">
                  Pedimos desculpa, infelizemnte ocorreu algum erro e seu
                  cadastro não foi validado.
                </p>
                <p className="text-[18px] text-[#2F2B3D]/[70%] mb-8 text-justify">
                  Clique no botão para tentarmos enviar outro e-mail de
                  verificação.
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
  );
};

export default VerifyEmail;
