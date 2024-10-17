"use client";

import Button from "../components/GradientButton";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { validationSchemaLogin } from "../hooks/validationSchema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface LoginFormValues {
  email: string;
  password: string;
}

interface LayoutProps {
  handleSubmit: (
    _values: LoginFormValues,
    _formikHelpers: FormikHelpers<LoginFormValues>,
  ) => void;
  showPassword: boolean;
  setShowPassword: (_show: boolean) => void;
  loginError: string;
  rememberMe: boolean;
  setRememberMe: (_remember: boolean) => void;
  email: string;
  setEmail: (_email: string) => void;
  password: string;
  setPassword: (_password: string) => void;
  initialValues: LoginFormValues;
}

const MobileLayout: React.FC<LayoutProps> = ({
  handleSubmit,
  showPassword,
  setShowPassword,
  loginError,
  rememberMe,
  setRememberMe,
  setEmail,
  setPassword,
  initialValues,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-white ">
    <div className="w-full h-full flex flex-col items-center justify-center px-[10vw] sd:px-[18vw] md:px-[24vw] ">
      <h2 className="text-2xl text-[#2F2B3D]/[90%] mb-2">
        Bem-vindo ao Centro de Carreiras
      </h2>
      <p className="text-md text-[#2F2B3D]/[70%] mb-6">
        Por favor, entre com sua conta para iniciar a sessão
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaLogin}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="w-full">
            {/* E-MAIL */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-md text-black">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 lg:p-3 text-black bg-transparent border border-gray-300 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setEmail(value);
                  setFieldValue("email", value);
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-md text-red-500 text-sm"
              />
            </div>

            {/* Password*/}
            <div className="mb-4">
              <label htmlFor="password" className="block text-black">
                Senha
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 lg:p-3 text-black bg-transparent border border-gray-300 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setPassword(value);
                    setFieldValue("password", value);
                  }}
                />
                <span
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
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
                className="text-red-500 text-sm"
              />
            </div>

            {/*  Remenber me / Forgot password*/}
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe" className="text-black">
                  Lembrar de mim
                </label>
              </div>
              <Link
                href="/reset-password"
                className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold"
              >
                Esqueci minha senha
              </Link>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}

            {/* Login Button */}
            <Button type="submit" disabled={isSubmitting} className="mb-4">
              {isSubmitting ? "Enviando..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Sign Up */}
      <div className="mt-6 text-center">
        <p className="text-black text-md text-[#2F2B3D]/[70%] inline">
          Novo na plataforma?{" "}
        </p>
        <Link
          href="/signup"
          className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold inline"
        >
          Criar uma conta
        </Link>
      </div>
    </div>
  </div>
);

const DesktopLayout: React.FC<LayoutProps> = ({
  handleSubmit,
  showPassword,
  setShowPassword,
  loginError,
  rememberMe,
  setRememberMe,
  email,
  setEmail,
  password,
  setPassword,
  initialValues,
}) => (
  <div className="min-h-screen flex">
    {/* HERO*/}
    <div className="flex-grow bg-white flex items-center justify-center p-[5px]">
      <div className="w-full h-full  bg-black rounded-lg"></div>
    </div>

    {/* LOGIN FORM */}
    <div className="w-1/2 lg:w-[500px] xl:w-[500px] 2xl:w-[600px] flex flex-col items-center justify-center bg-white px-[3vw]  lg:px-[50px] 2xl:px-[80px]">
      <h2 className="text-2xl text-[#2F2B3D]/[90%] mb-2">
        Bem-vindo ao Centro de Carreiras
      </h2>
      <p className="text-md text-[#2F2B3D]/[70%] mb-6">
        Por favor, entre com sua conta para iniciar a sessão
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaLogin}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="w-full">
            {/* E-MAIL */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-md text-black">
                Email
              </label>
              <Field
                name="email"
                type="email"
                value={email}
                className="w-full p-2 lg:p-3 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  border: "none",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setEmail(value);
                  setFieldValue("email", value);
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-md text-red-500 text-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-black">
                Senha
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="w-full p-2 lg:p-3 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  style={{
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    setPassword(value);
                    setFieldValue("password", value);
                  }}
                />
                <span
                  className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
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
                className="text-red-500 text-sm"
              />
            </div>

            {/* Remenber me / Forgot password */}
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe" className="text-black">
                  Lembrar de mim
                </label>
              </div>
              <Link
                href="/reset-password"
                className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold"
              >
                Esqueci minha senha
              </Link>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}

            {/* Login Button */}
            <Button type="submit" disabled={isSubmitting} className="mb-4">
              {isSubmitting ? "Enviando..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Sign Up */}
      <div className="mt-6 text-center">
        <p className="text-black text-md text-[#2F2B3D]/[70%] inline">
          Novo na plataforma?{" "}
        </p>
        <Link
          href="/signup"
          className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold inline"
        >
          Criar uma conta
        </Link>
      </div>
    </div>
  </div>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < (2 / 3) * window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    console.log(savedEmail + " " + savedPassword);

    if (savedEmail && savedPassword) {
      setInitialValues({
        email: savedEmail,
        password: savedPassword,
      });
      setEmail(savedEmail);
      setPassword(savedPassword);
    }

    setLoading(false);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      const response = await fetch(`${apiUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        if (rememberMe) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
        }
        router.push("/home");
      } else {
        setLoginError("Usuário ou senha inválido");
      }
    } catch (error) {
      console.error("Erro ao tentar logar:", error);
      setLoginError("Ocorreu um erro. Tente novamente mais tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  {
    /*SOLUÇÃO TEMPORÁRIA*/
  }
  if (loading) {
    return <div className=" h-screen bg-white"></div>;
  }

  return (
    <>
      {isMobile ? (
        <MobileLayout
          handleSubmit={handleSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loginError={loginError}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          initialValues={initialValues}
        />
      ) : (
        <DesktopLayout
          handleSubmit={handleSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loginError={loginError}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          initialValues={initialValues}
        />
      )}
    </>
  );
}
