"use client";

import Button from "../components/GradientButton";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { validationSchemaLogin } from "../hooks/validationSchema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import Cookies from 'js-cookie'; // Import js-cookie to work with cookies
import { AxiosError } from "axios";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface LoginFormValues {
  email: string;
  password: string;
}

interface LayoutProps {
    handleSubmit: (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    loginError: string;
    rememberMe: boolean;
    setRememberMe: (remember: boolean) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    initialValues: LoginFormValues
}

const MobileLayout: React.FC<LayoutProps> = ({ handleSubmit, showPassword, setShowPassword, loginError, rememberMe, setRememberMe, email, setEmail, password, setPassword, initialValues}) => (
    <div className="min-h-screen md:h-screen max-h-full flex items-center justify-center">
        <div className="relative w-full min-h-screen h-full flex flex-col items-center justify-center bg-white px-[10vw] sd:px-[15vw] md:px-[20vw] overflow-hidden">
        
        {/* Background */}
        <div
            className="absolute  h-full bg-cover bg-no-repeat w-[90%] 2xl:w-3/10 transform scale-x-[-1] z-0"
            style={{
                backgroundImage: "url('/images/identidade-visual/Ativo-11linhas.png')",
                opacity: 0.25,
                transform: 'rotate(0deg)',
            }}
        ></div>

        {/* Content*/}
        <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Logo */}
            <div className="flex items-center justify-center p-5 mb-5 mt-5">
            <img 
                src="/images/logos/0.Principal/Logo-Patronos-Principal.png" 
                alt="Logo" 
                className="sm:w-[60vw] md:w-[50vw] w-[50vw] lg:w-[40vw] xl:w-[40vw] h-auto" 
            />
            </div>

                    {/* Main messagens*/}
                    <div className="flex-grow flex flex-col items-center justify-center  ">
                    <h1 className="text-4xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C964E2] via-[#FF6666] to-[#FF9700]">
                        Pronto para decolar a sua carreira?
                    </h1>
                        <p className="text-black text-center mt-4 text-[20px] mb-6">
                        Nós te conectamos com talentos que já passaram pela Unicamp.
                        </p>
                    </div>

                <h2 className="text-2xl text-[#2F2B3D]/[90%] text-center mb-2">Bem-vindo ao Centro de Carreiras</h2>
                <p className="text-md text-[#2F2B3D]/[70%] text-center mb-6">Por favor, entre com sua conta para iniciar a sessão</p>

            <Formik
                initialValues={initialValues} 
                validationSchema={validationSchemaLogin}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="w-full  mx-auto">
                        {/* E-MAIL */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-md text-black">Email</label>
                            <Field
                                name="email"
                                type="email"
                                className="w-full p-2 lg:p-3 text-black bg-transparent border border-gray-300 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                style={{
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    border: 'none',
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    setEmail(value); 
                                    setFieldValue('email', value); 
                                }}
                            />
                            <ErrorMessage name="email" component="div" className="text-md text-red-500 text-sm" />
                        </div>

                        {/* Password*/}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-black">Senha</label>
                            <div className="relative">
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full p-2 lg:p-3 text-black bg-transparent border border-gray-300 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    style={{
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                        border: 'none',
                                    }}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value;
                                        setPassword(value); 
                                        setFieldValue('password', value); 
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
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
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
                                <label htmlFor="rememberMe" className="text-black">Lembrar de mim</label>
                            </div>
                            <Link href="/reset-password" className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold">
                                Esqueci minha senha
                            </Link>
                        </div>

            {loginError && (
              <p className="text-red-500 text-sm mb-4">{loginError}</p>
            )}

                        {/* Login Button */}
                        <Button type="submit" disabled={isSubmitting} className="mb-4">
                            {isSubmitting ? 'Enviando...' : 'Login'}
                        </Button>
                    </Form>
                )}
            </Formik>

            {/* Sign Up */}
            <div className="mt-6 text-center">
                <p className="text-black text-md text-[#2F2B3D]/[70%] inline">Novo na plataforma? </p>
                <Link href="/signup" className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold inline">
                    Criar uma conta
                </Link>
            </div>

            {/* Texts */}
            <div className="p-5 mt-10">
                        <div className="items-center justify-center text-center text-black text-left text-[18px]">
                        <p>Mentorias.</p>
                        <p>Oportunidades.</p>
                        <p>Networking.</p>
                        <p>De ex-aluno para aluno.</p>
                        </div>
                </div>
            </div>
        </div>
    </div>
);

const DesktopLayout: React.FC<LayoutProps> = ({handleSubmit, showPassword, setShowPassword, loginError, rememberMe, setRememberMe, email, setEmail,password,setPassword, initialValues}) => (
    <div className="min-h-screen flex">
        {/* HERO*/}
        <div className="flex-grow bg-white flex items-center justify-center p-[20px]">
            <div className="relative w-full h-full rounded-3xl flex-grow bg-[rgb(0,0,0,5%)] flex items-center justify-center p-8 shadow-2xl">
                {/* Background */}
                <div
                className="absolute right-0 top-0 h-full bg-cover bg-no-repeat transform scale-x-[-1] 
                           min-w-[375px] w-full max-w-[700px]  lg:w-2/3 xl:w-1/4"
                style={{
                    backgroundImage: "url('/images/identidade-visual/Ativo-11linhas.png')",
                }}
                ></div>

                {/* Content*/}
                <div className="w-full h-full flex flex-col justify-between items-start text-left">
                    {/* Logo */}
                    <div className="flex items-center justify-start p-5">
                    <img 
                        src="/images/logos/0.Principal/Logo-Patronos-Principal.png" 
                        alt="Logo" 
                        className="w-32 sm:w-40 md:w-50 lg:w-60 xl:w-65 h-auto" 
                    />
                    </div>

                    {/* Main messagens*/}
                    <div className="flex-grow flex flex-col items-start justify-center text-left max-w-[65%] ">
                    <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C964E2] via-[#FF6666] to-[#FF9700]">
                        Pronto para decolar a sua carreira?
                    </h1>
                        <p className="text-black mt-4 text-2xl max-w-[70%]">
                        Nós te conectamos com talentos que já passaram pela Unicamp.
                        </p>
                    </div>

                    {/* Texts left corner */}
                    <div className="p-5">
                        <div className="text-black text-left text-[18px]">
                        <p>Mentorias.</p>
                        <p>Oportunidades.</p>
                        <p>Networking.</p>
                        <p>De ex-aluno para aluno.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* LOGIN FORM */}
        <div className="w-1/2 lg:w-[500px] xl:w-[500px] 2xl:w-[600px] flex flex-col items-center justify-center bg-white px-[3vw]  lg:px-[50px] 2xl:px-[80px]">
            <h2 className="text-2xl text-[#2F2B3D]/[90%] mb-2">Bem-vindo ao Centro de Carreiras</h2>
            <p className="text-md text-[#2F2B3D]/[70%] mb-6">Por favor, entre com sua conta para iniciar a sessão</p>

            <Formik
                initialValues={initialValues} 
                validationSchema={validationSchemaLogin}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue}) => (
                    <Form className="w-full">
                        {/* E-MAIL */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-md text-black">Email</label>
                            <Field
                                name="email"
                                type="email"
                                value = {email}
                                className="w-full p-2 lg:p-3 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                style={{
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                    border: 'none',
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    setEmail(value); 
                                    setFieldValue('email', value); 
                                }}
                                
                            />
                            <ErrorMessage name="email" component="div" className="text-md text-red-500 text-sm" />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-black">Senha</label>
                            <div className="relative">
                                <Field
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password} 
                                    className="w-full p-2 lg:p-3 text-black shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    style={{
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                        border: 'none',
                                    }}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value;
                                        setPassword(value); 
                                        setFieldValue('password', value); 
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
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
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
                                <label htmlFor="rememberMe" className="text-black">Lembrar de mim</label>
                            </div>
                            <Link href="/forgot-password" className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold">
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
                <p className="text-black text-md text-[#2F2B3D]/[70%] inline">Novo na plataforma? </p>
                <Link href="/signup" className="text-md text-[#103768]/[100%] hover:text-[#103768] hover:font-semibold inline">
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
  const login = useAuthStore((state) => state.login);
    const [rememberMe, setRememberMe] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [initialValues, setInitialValues] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(true);
  const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < (2/3)*window.innerHeight); 
        };
        window.addEventListener('resize', handleResize);
        handleResize(); 

        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');

        if (savedEmail && savedPassword) {
            setInitialValues({ 
                email: savedEmail, 
                password: savedPassword 
            });
            setEmail(savedEmail);
            setPassword(savedPassword);
        }

        setLoading(false);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

const handleSubmit = async (
  values: LoginFormValues,
  { setSubmitting }: FormikHelpers<LoginFormValues>
) => {
  try {
    const response = await axios.post(`${apiUrl}/signin`, values);

    if (response.status === 200) {
      const { email, username, token, refresh_token } = response.data;
      login({ email, username }, token, refresh_token); // Store the user data in Zustand

      // Save token to cookies instead of localStorage
      Cookies.set(
        "auth-storage",
        JSON.stringify({ accessToken: token, refreshToken: refresh_token }),
        {
          expires: 1, // Expires in 1 day (you can customize this)
          secure: true,
          sameSite: "strict",
        }
      );

      if (rememberMe) {
            localStorage.setItem('email', values.email);
            localStorage.setItem('password', values.password); 
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }

      router.push("/home");
    } 
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
        if (err.response.status === 401) {
          setLoginError("Usuário ou senha inválido");
        } else {
          setLoginError("Ocorreu um erro. Tente novamente mais tarde.");
        }
      } else if (err.request) {
        console.error("Erro de rede ou servidor indisponível");
        setLoginError("Servidor indisponível. Tente novamente mais tarde.");
      } else {
        console.error("Erro na requisição:", err.message);
        setLoginError("Erro inesperado. Tente novamente.");
      }
  } finally {
    setSubmitting(false);
  }
};

    {/*SOLUÇÃO TEMPORÁRIA*/}
    if (loading) { return <div className=" h-screen bg-white"></div>}

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
