"use client";

import Button from "../../components/GradientButton";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  validationSchemaSignUp,
  isEmailValid,
} from "../../hooks/validationSchema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import AuthPopup from "../../components/AuthPopup";

interface SignUpFormValues {
  username: string;
  name: string;
  email: string;
  password: string;
  graduation_year: number | "";
  course: string;
  linkedin?: string;
  is_domain_valid: boolean;
}

interface LayoutProps {
  handleSubmit: (
    _values: SignUpFormValues,
    _formikHelpers: FormikHelpers<SignUpFormValues>,
  ) => Promise<void>;
  showPassword: boolean;
  setShowPassword: (_show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (_show: boolean) => void;
  emailWarning: string | null;
  setEmailWarning: (_warning: string | null) => void;
  foundDataWarning: string | null;
  setFoundDataWarning: (_warning: string | null) => void;
}

const MobileLayout: React.FC<LayoutProps> = ({
  handleSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  emailWarning,
  setEmailWarning,
  foundDataWarning,
  setFoundDataWarning,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-white ">
    <div className="w-full h-full flex flex-col items-center justify-center px-[10vw] sd:px-[18vw] md:px-[24vw] ">
      <h2 className="text-2xl text-[#2F2B3D]/[90%] mb-2">
        Bem-vindo ao Centro de Carreiras
      </h2>
      <p className="text-md text-[#2F2B3D]/[70%] mb-6">
        Por favor, crie sua conta para conhecer nossa plataforma
      </p>

      <h1 className="text-4xl font-semibold text-[#2F2B3D]/[90%] mb-4">
        Cadastre-se
      </h1>

      <Formik
        initialValues={{
          username: "",
          name: "",
          email: "",
          password: "",
          graduation_year: "",
          course: "",
          linkedin: "",
          is_domain_valid: false,
        }}
        validationSchema={validationSchemaSignUp}
        onSubmit={handleSubmit}
      >
        {({ setFieldTouched, isSubmitting, touched, errors }) => (
          <Form className="w-full space-y-6">
            {/* Username */}
            <div className="relative flex items-center">
              <Field
                name="username"
                type="text"
                placeholder="Nome do Usuário"
                className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
                onBlur={() => {
                  setFieldTouched("username", true);
                  setFoundDataWarning("");
                }}
              />
              {touched.username && errors.username && (
                <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                  *
                </span>
              )}
            </div>

            {/* Full Name */}
            <div className="relative flex items-center">
              <Field
                name="name"
                type="text"
                placeholder="Nome Completo"
                className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
              />
              {touched.name && errors.name && (
                <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                  *
                </span>
              )}
            </div>

            {/* E-mail */}
            <div className="relative">
              <div className="relative flex items-center">
                <Field
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                  onBlur={(_e: React.FocusEvent<HTMLInputElement>) => {
                    setFieldTouched("email", true);
                    const isValid = isEmailValid(_e.target.value);
                    if (!isValid) {
                      setEmailWarning(
                        "Esse e-mail precisará de aprovação manual por não pertencer aos domínios da Unicamp.",
                      );
                    } else {
                      setEmailWarning("");
                    }
                    setFoundDataWarning("");
                  }}
                />
                {touched.email && errors.email && (
                  <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                    *
                  </span>
                )}
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* Course */}
            <div className="relative flex items-center">
              <Field
                name="course"
                type="text"
                placeholder="Curso"
                className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
              />
              {touched.course && errors.course && (
                <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                  *
                </span>
              )}
            </div>

            {/* Graduation Year */}
            <div className="relative">
              <div className="relative flex items-center">
                <Field
                  name="graduation_year"
                  type="number"
                  placeholder="Ano de Graduação"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                />
                {touched.graduation_year && errors.graduation_year && (
                  <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                    *
                  </span>
                )}
              </div>
              <ErrorMessage
                name="graduation_year"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Criar Senha"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-700" />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
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
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* linkedin */}
            <Field
              name="linkedin"
              type="text"
              placeholder="Linkedin (Opcional)"
              className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                border: "none",
              }}
            />

            {/* Warning message */}
            {emailWarning && (
              <div style={{ color: "orange", marginTop: "10px" }}>
                {emailWarning}
              </div>
            )}

            {/*Sign Up Button */}
            <Button type="submit" disabled={isSubmitting} className="mb-4">
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <div className="flex justify-center items-center mt-2">
              {/* Data Found Warning*/}
              {foundDataWarning && (
                <div className="text-red-600 mt-2">{foundDataWarning}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Login */}
      <div className="mt-6 text-center">
        <p className="text-black text-md text-[#2F2B3D]/[70%] inline">
          Já possui conta?{" "}
        </p>
        <Link
          href="/"
          className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold inline"
        >
          Faça Login
        </Link>
      </div>
    </div>
  </div>
);

const DesktopLayout: React.FC<LayoutProps> = ({
  handleSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  emailWarning,
  setEmailWarning,
  foundDataWarning,
  setFoundDataWarning,
}) => (
  <div className="min-h-screen flex">
    {/* HERO */}
    <div className="flex-grow bg-white flex items-center justify-center p-[5px]">
      <div className="w-full h-full bg-black rounded-lg"></div>
    </div>

    {/* SIGNUP FORM */}
    <div className="w-1/2 lg:w-[500px] xl:w-[500px] 2xl:w-[600px] flex flex-col items-center justify-center bg-white px-[3vw]  lg:px-[50px] 2xl:px-[80px]">
      <h2 className="text-2xl text-[#2F2B3D]/[90%] mb-2">
        Bem-vindo ao Centro de Carreiras
      </h2>
      <p className="text-md text-[#2F2B3D]/[70%] mb-6">
        Por favor, crie sua conta para conhecer nossa plataforma
      </p>

      <h1 className="text-4xl font-semibold text-[#2F2B3D]/[90%] mb-4">
        Cadastre-se
      </h1>

      <Formik
        initialValues={{
          username: "",
          name: "",
          email: "",
          password: "",
          graduation_year: "",
          course: "",
          linkedin: "",
          is_domain_valid: false,
        }}
        validationSchema={validationSchemaSignUp}
        onSubmit={handleSubmit}
      >
        {({ setFieldTouched, isSubmitting, touched, errors }) => (
          <Form className="w-full space-y-6">
            {/* Username */}
            <div className="relative flex items-center">
              <Field
                name="username"
                type="text"
                placeholder="Nome do Usuário"
                className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
                onBlur={() => {
                  setFieldTouched("username", true);
                  setFoundDataWarning("");
                }}
              />
              {touched.username && errors.username && (
                <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                  *
                </span>
              )}
            </div>

            {/* Full Name */}
            <div className="relative flex items-center">
              <Field
                name="name"
                type="text"
                placeholder="Nome Completo"
                className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
              />
              {touched.name && errors.name && (
                <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                  *
                </span>
              )}
            </div>

            {/* E-mail */}
            <div className="relative">
              <div className="relative flex items-center">
                <Field
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                  onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                    setFieldTouched("email", true);
                    const isValid = isEmailValid(e.target.value);
                    if (!isValid) {
                      setEmailWarning(
                        "Esse e-mail precisará de aprovação manual por não pertencer aos domínios da Unicamp.",
                      );
                    } else {
                      setEmailWarning("");
                    }
                    setFoundDataWarning("");
                  }}
                />
                {touched.email && errors.email && (
                  <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                    *
                  </span>
                )}
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* Course */}
            <div className="relative flex items-center">
              <Field
                name="course"
                type="text"
                placeholder="Curso"
                className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
              />
              {touched.course && errors.course && (
                <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                  *
                </span>
              )}
            </div>

            {/* Graduation Year */}
            <div className="relative">
              <div className="relative flex items-center">
                <Field
                  name="graduation_year"
                  type="number"
                  placeholder="Ano de Graduação"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                />
                {touched.graduation_year && errors.graduation_year && (
                  <span className="text-red-500 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">
                    *
                  </span>
                )}
              </div>
              <ErrorMessage
                name="graduation_year"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Criar Senha"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-700" />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
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
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="absolute text-red-500 text-sm top-full "
              />
            </div>

            {/* linkedin */}
            <Field
              name="linkedin"
              type="text"
              placeholder="Linkedin (Opcional)"
              className="w-full p-2 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              style={{
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                border: "none",
              }}
            />

            {/* Warning message */}
            {emailWarning && (
              <div style={{ color: "orange", marginTop: "10px" }}>
                {emailWarning}
              </div>
            )}

            {/* Sign up Button */}
            <Button type="submit" disabled={isSubmitting} className="mb-4">
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>

            <div className="flex justify-center items-center mt-2">
              {/* Data Found Warning*/}
              {foundDataWarning && (
                <div className="text-red-600 mt-2">{foundDataWarning}</div>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {/* Login */}
      <div className="mt-6 text-center">
        <p className="text-black text-md text-[#2F2B3D]/[70%] inline">
          Já possui conta?{" "}
        </p>
        <Link
          href="/"
          className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold inline"
        >
          Faça Login
        </Link>
      </div>
    </div>
  </div>
);

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailWarning, setEmailWarning] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [foundDataWarning, setFoundDataWarning] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [apiUrl, setApiUrl] = useState('');

  const router = useRouter();

  useEffect(() => {

    const fetchApiUrl = async () => {
      const response = await fetch('/api');
      const data = await response.json();
      console.log("AQUIII: ", data.apiUrl);
      setApiUrl(data.apiUrl);
    };

    fetchApiUrl();

    const handleResize = () => {
      setIsMobile(window.innerWidth < (2 / 3) * window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (values: SignUpFormValues) => {
    values.is_domain_valid = isEmailValid(values.email);

    const debugMessage = `
            Nome de usuário: ${values.username}
            Nome completo: ${values.name}
            E-mail: ${values.email}
            Ano de graduação: ${values.graduation_year}
            Curso: ${values.course}
            linkedin: ${values.linkedin ? values.linkedin : "Não fornecido"}
            Validação de domínio: ${values.is_domain_valid}
        `;
    console.log(debugMessage);
    console.log("url:");
    console.log(apiUrl);

    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.email_sent) {
          setIsEmailSent(true);
        } else {
          setIsEmailSent(false);
        }
        setIsPopupOpen(true);
      } else if (response.status === 409) {
        console.log(result);
        if (result.email_in_use && result.username_in_use) {
          setFoundDataWarning("Este e-mail e nome de usuário já estam em uso.");
          values.email = "";
          values.username = "";
        } else if (result.email_in_use) {
          setFoundDataWarning("Este e-mail já foi cadastrado.");
          values.email = "";
        } else if (result.username_in_use) {
          setFoundDataWarning("Este nome de usuário já está em uso.");
          values.username = "";
        }
      } else {
        alert("Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Ocorreu um erro. Tente novamente mais tarde. \n ${error.message}`);
      } else {
        alert("Ocorreu um erro desconhecido. Tente novamente mais tarde.");
      }
    }
  };
  return (
    <>
      {isMobile ? (
        <MobileLayout
          handleSubmit={handleSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          emailWarning={emailWarning}
          setEmailWarning={setEmailWarning}
          foundDataWarning={foundDataWarning}
          setFoundDataWarning={setFoundDataWarning}
        />
      ) : (
        <DesktopLayout
          handleSubmit={handleSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          emailWarning={emailWarning}
          setEmailWarning={setEmailWarning}
          foundDataWarning={foundDataWarning}
          setFoundDataWarning={setFoundDataWarning}
        />
      )}
      <AuthPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        emailSent={isEmailSent}
        router={router}
      />
    </>
  );
}
