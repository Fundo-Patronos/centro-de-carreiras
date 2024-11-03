import React, { useEffect, useState } from "react";
import Button from "./GradientButton";
import { useRouter } from "next/navigation";

const TOKEN_EXPIRATION_TIMER = 30;

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  emailSent: boolean;
  router: ReturnType<typeof useRouter>;
}

const AuthPopup: React.FC<AuthPopupProps> = ({
  isOpen,
  onClose,
  emailSent,
  router,
}) => {
  const [timeLeft, setTimeLeft] = useState(TOKEN_EXPIRATION_TIMER);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOpen && emailSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 60000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isOpen, emailSent, timeLeft]);

  const handleClose = () => {
    onClose();
    router.push("/");
  };

  const renderSuccessPopup = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-[90%] md:max-w-[500px] w-full shadow-black">
      <h2 className="text-[24px] sm:text-[28px] font-semibold text-[#2F2B3D]/[90%] mb-4 text-center">
        Verifique seu e-mail
      </h2>
      <p className="text-sm sm:text-md text-[#2F2B3D]/[70%] mb-1 text-justify">
        Seu cadastro foi realizado com sucesso!
      </p>
      <p className="text-sm sm:text-md text-[#2F2B3D]/[70%] mb-6 text-justify">
        Um e-mail de verificação foi enviado para sua caixa de entrada para validar seu cadastro.
      </p>
      <p className="text-sm sm:text-md text-[#2F2B3D]/[70%] mb-4 text-justify">
        Token expira em: {timeLeft} minutos
      </p>
      <div className="relative h-2 bg-gray-200 mt-2 mb-4">
        <div
          style={{ width: `${(timeLeft / TOKEN_EXPIRATION_TIMER) * 100}%` }}
          className="bg-[linear-gradient(to_right,#FF6666,#C964E2)] h-full"
        />
      </div>
      <div className="mt-4">
        <Button onClick={handleClose} className="mb-4 p-2">
          Login
        </Button>
      </div>
    </div>
  );

  const renderWaitingPopup = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-[90%] md:max-w-[500px] w-full shadow-black">
      <h2 className="text-[24px] font-semibold text-[#2F2B3D]/[90%] mb-4 text-center">
        Aguardando aprovação manual
      </h2>
      <p className="text-sm sm:text-md text-[#2F2B3D]/[70%] mb-1 text-justify">
        Seu cadastro foi realizado com sucesso, porém o e-mail cadastrado não faz parte dos domínios da Unicamp, então precisará ser verificado manualmente pela equipe de organização do Patronos.
      </p>
      <p className="text-sm sm:text-md text-[#2F2B3D]/[70%] mb-6 text-justify">
        Assim que seu cadastro for aprovado você será notificado por e-mail!
      </p>
      <div className="mt-6">
        <Button onClick={handleClose} className="mb-4 p-2">
          Fechar
        </Button>
      </div>
    </div>
  );

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        {emailSent ? renderSuccessPopup() : renderWaitingPopup()}
      </div>
    )
  );
};

export default AuthPopup;
