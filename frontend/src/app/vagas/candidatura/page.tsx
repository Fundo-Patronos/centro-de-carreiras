"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Snackbar, Alert, TextField } from "@mui/material";
import { AlertCircle, File, Edit , Info, Mail} from "lucide-react";
import Button from "@/components/GradientButton";
import axios from "axios";
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';

interface Opportunity {
  id: string;
  Name: string;
  Status: string;
  Vaga: string;
  Tipo: string;
  Contato: string;
  Descricao: string;
}

const Candidatura = () => {
  const searchParams = useSearchParams();
  const vagaId = searchParams.get("vagaId");

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [curriculum, setCurriculum] = useState<string | ArrayBuffer | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [subject, setSubject] = useState("");
  const [errorMessage, setErrorMessage] = useState("Carregando...");
  const [showPopup, setShowPopup] = useState(false);
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  
  const userName = useAuthStore((state) => state.username) || "Visitante";
  const userEmail = useAuthStore((state) => state.email) || "email@dominio.com";

  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
        const response = await axios.get("/api");
        const url = response.data.apiUrl;
        setApiUrl(url);
      } catch {
        setError("Erro ao carregar a URL da API.");
      }
    };

    fetchApiUrl();
  }, []);

  useEffect(() => {
    const fetchOpportunity = async () => {
      if (!vagaId || !apiUrl) return;

      try {
        setLoading(true);
        const response = await axios.get<Opportunity>(`${apiUrl}/opportunities/${vagaId}`);
        setOpportunity(response.data);
        setError(null);
      } catch {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            setError("Sentimos muito! Esta vaga não existe no nosso sistema.");
            setErrorMessage("Sentimos muito! Esta vaga não existe no nosso sistema.");
          } else {
            setError("Erro ao carregar a vaga. Tente novamente mais tarde.");
            setErrorMessage("Erro ao carregar a vaga. Tente novamente mais tarde.");
          }
        } else {
          setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
          setErrorMessage("Ocorreu um erro.Tente novamente mais tarde.");
        }      
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
  }, [vagaId, apiUrl, error]);

  useEffect(() => {
    if (opportunity) {
      const oppName = opportunity.Vaga;
      const oppType = opportunity.Tipo;
      setSubject(
        `[Centro de Carreiras Patronos] ${userName} aplicou para a vaga de ${oppName}`
      );
      setCoverLetter(
        `Olá,\nMe chamo ${userName} e gostaria de aplicar para a vaga de ${oppType} como ${oppName}.\nEstou entusiasmado com a oportunidade de trabalhar nesta posição e contribuir com minhas habilidades para o sucesso da equipe.`
      );
    }
  }, [opportunity, userName]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        setCurriculum(base64String);
      }
    }
    else {
      setCurriculum(file);
    }
  };

  const handleSubmit = async () => {
    if (!coverLetter.trim()) {
      setSnackbarMessage("Por favor, preencha a mensagem para o recrutador.");
      setSnackbarOpen(true);
      return;
    }

    const applicationDataOpportunityEmail = {
      email: opportunity?.Contato,
      subject,
      body: coverLetter,
      copy_email: userEmail,
      opportunity_id: opportunity?.id,
      file_base64: curriculum
    };

    try {
      await axios.post(`${apiUrl}/send_opportunity_email`, applicationDataOpportunityEmail);
      setSnackbarMessage("Candidatura enviada com sucesso!");
    } catch (_) {
      setSnackbarMessage("Erro ao enviar candidatura. Tente novamente.");
    }
    setShowPopup(false);
    setSnackbarOpen(true);
  };

  return (
    <Layout currentPage="candidaturas">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <section
          className="relative z-10 w-full flex flex-col justify-center items-center text-center bg-white overflow-hidden bg-gradient-to-r from-[#C964E2]/30 via-[#FF6666]/20 to-[#FF9700]/30 shadow-md"
          style={{
            height: "30vh",
          }}
        >
          <div className="relative z-10 px-4">
            {opportunity ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <File className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                  <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Candidate-se para a vaga
                  </h1>
                </div>
                <p className="text-lg md:text-xl text-gray-600 flex items-center gap-2">
                  de <span className="font-semibold text-purple-600">{opportunity.Name}</span>
                </p>
              </div>
            ) : error && (
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  {errorMessage}
                </h1>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-purple-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-2 md:gap-3">
                <Info className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Informações</h2>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <p className="text-gray-500">Carregando...</p>
              ) : opportunity ? (
                <div className="space-y-4 text-black">
                  <p><strong>Empresa:</strong> {opportunity.Name}</p>
                  <p><strong>Status:</strong> {opportunity.Status}</p>
                  <p><strong>Título:</strong> {opportunity.Vaga}</p>
                  <p><strong>Tipo:</strong> {opportunity.Tipo}</p>
                  <p><strong>Contato:</strong> {opportunity.Contato}</p>
                  <p><strong>Descrição:</strong> <span dangerouslySetInnerHTML={{ __html: opportunity.Descricao.replace(/\n/g, '<br />') }} /></p>
                </div>
              ) : (
                <p className="text-gray-500">Nenhuma informação disponível.</p>
              )}
            </div>
          </div>
        </div>

        {opportunity && (
          <div className="w-full relative">
            {/* Background image container */}
            <div className="absolute left-0 right-0 top-0 bottom-0 w-full z-0 pointer-events-none opacity-20">
              <Image
                src="/images/identidade-visual/Ativo-9assets.svg"
                alt="Background Pattern"
                fill
                style={{ objectFit: 'cover' }}
                priority={false}
              />
            </div>

            <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-8 text-black relative z-10">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl border border-purple-100 overflow-hidden">
                <div className="p-4 md:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Edit className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800">Aplique</h2>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 p-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Preencha os campos para enviarmos um e-mail para o recrutador</span>
                  </div>

                  <div className="p-4 space-y-6">
                    <div className="space-y-2">
                      <p><strong>Nome:</strong> {userName}</p>
                      <p><strong>Email:</strong> {userEmail}</p>
                    </div>

                    <div className="space-y-2">
                        <label className="block font-medium">Envie seu currículo (.pdf):</label>
                        <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="block w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="space-y-2">
                      <label className="block font-medium">Assunto:</label>
                      <TextField
                        fullWidth
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        variant="outlined"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escreva um assunto..."
                      />

                      <label className="block font-medium">Envie uma mensagem para o recrutador:</label>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        variant="outlined"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        placeholder="Escreva aqui sua mensagem..."
                      />
                    </div>
                    <div className="w-full">
                      <div className="w-full flex justify-center">
                        <Button
                            onClick={() => setShowPopup(true)}
                            className="w-full sm:w-auto min-w-[150px] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold"
                          >
                            Enviar Candidatura
                          </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2">
              <div className="p-4 md:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="flex items-center gap-2 md:gap-3">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Confirmação de envio de email
                  </h2>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="space-y-2">
                  <p><strong>Seu Email:</strong> {userEmail}</p>
                  <p><strong>Email do recrutador:</strong> {opportunity?.Contato}</p>
                  <p>
                    <strong>Assunto:</strong><br />
                    {subject}
                  </p>
                  <p>
                    <strong>Email:</strong><br />
                    {coverLetter}
                  </p>
                </div>

                <div className="flex justify-end mt-6 gap-4">
                  <button
                    className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-200"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancelar
                  </button>
                  <Button
                    className="w-auto px-4 py-2"
                    onClick={handleSubmit}
                  >
                    Enviar Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes("Erro") ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default function candidatura() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Candidatura />
    </Suspense>
  );
}