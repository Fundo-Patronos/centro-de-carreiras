"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import TimeIntervalsTable from '../../../components/DataTable';
import { Snackbar, Alert } from '@mui/material';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import Layout from "@/components/Layout";
import { Button } from "@mui/material";
import { Calendar, Clock, User } from 'lucide-react';
import GradientButton from '@/components/GradientButton';
import Image from 'next/image';

interface Row {
  day: string;
  startTime: string;
  endTime: string;
}

const Agendamento = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mentor = searchParams.get('mentor');
  const email = searchParams.get('email');

  const [selectedRows, setSelectedRows] = useState<Row[]>([]);
  const [rowsAvailable, setRowsAvailable] = useState<boolean>(true);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleSelectionChange = (newSelection: Row[]) => {
    setSelectedRows(newSelection);
  };

  const handleButtonClick = () => {
    const timeIntervals = selectedRows.map((row: Row) => `${row.day} ${row.startTime} - ${row.endTime}`);
    const generatedMessage = `Olá ${mentor}!\n\nEstou entrando em contato através do Centro de Carreiras do Fundo Patronos e gostaria da sua ajuda para discutir os próximos passos da minha carreira.\n\nEstou disponível nos seguintes horários: ${timeIntervals.join(', ')}.\n\nObrigado!\n\n(Este email foi gerado automaticamente pelo Centro de Carreiras do Fundo Patronos)\n`;
    setMessage(generatedMessage);
    setConfirmationOpen(true);
  };

  const handleRequestAvailability = () => {
    const availabilityRequestMessage = `Olá ${mentor}!\n\nGostaria de saber se você tem outros horários disponíveis para mentoria, além dos que estão atualmente visíveis. Agradeço pela sua atenção.\n\nObrigado!\n\n(Este email foi gerado automaticamente pelo Centro de Carreiras do Fundo Patronos)\n`;
    setMessage(availabilityRequestMessage);
    setConfirmationOpen(true);
  };

  const handleConfirm = () => {
    setConfirmationOpen(false);
  };

  const handleClose = () => {
    setConfirmationOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRedirectToMentors = () => {
    router.push('/mentores');
  };

  return (
    <Layout currentPage="mentores">
      <div className="min-h-screen bg-white relative">
        {/* Add background image container */}
        <div className="absolute left-0 right-0 top-[30vh] bottom-0 z-0 pointer-events-none opacity-20">
          <Image
            src="/images/identidade-visual/Ativo-9assets.svg"
            alt="Background Pattern"
            fill
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        </div>

        <section
          className="relative z-10 w-full flex flex-col justify-center items-center text-center bg-white overflow-hidden bg-gradient-to-r from-[#C964E2]/30 via-[#FF6666]/20 to-[#FF9700]/30 shadow-md"
          style={{
            height: "30vh",
          }}
        >
          {/* Content */}
          <div className="relative z-10 px-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2 md:gap-3">
                <User className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Agende uma reunião
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-600 flex items-center gap-2">
                com <span className="font-semibold text-purple-600">{mentor}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Selection Section */}
        <div className="relative z-10 max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-8">
          <div className="bg-white/90 rounded-xl md:rounded-2xl shadow-sm md:shadow-xl border border-purple-100 overflow-hidden">
            {/* Schedule Header */}
            <div className="p-4 md:p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50/90 to-pink-50/90">
              <div className="flex items-center gap-2 md:gap-3">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">Horários Disponíveis</h2>
              </div>
            </div>

            {/* Schedule Grid */}
            <div className="p-3 md:p-6">
              <div className="mb-4 md:mb-6">
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Selecione os horários que melhor se adequam à sua agenda</span>
                </div>
              </div>

              {rowsAvailable ? (
                <div className="bg-white/90 p-2 md:p-2 overflow-x-auto">
                  <TimeIntervalsTable 
                    mentor={mentor ?? ""} 
                    onSelectionChange={handleSelectionChange} 
                    setRowsAvailable={setRowsAvailable}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center px-4">
                  <Clock className="w-10 h-10 md:w-12 md:h-12 text-gray-400 mb-3 md:mb-4" />
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                    Não há horários disponíveis
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
                    No momento não existem horários disponíveis para este mentor.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 md:mt-6 flex flex-col md:flex-row gap-3 md:justify-end">
              <Button
                  variant="outlined"
                  className="w-full md:w-auto text-purple-600 hover:bg-purple-50 sm:text-sm md:text-md p-2 lg:p-3" // Added padding and font size
                  onClick={handleRedirectToMentors}
                  style={{ textTransform: 'none' }}
                >
                  Ver outros mentores
                </Button>
                <GradientButton
                  style={{ borderRadius: 4 }}
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:shadow-lg transition-shadow"
                  disabled={rowsAvailable && !(selectedRows.length > 0)}
                  onClick={rowsAvailable ? handleButtonClick : handleRequestAvailability}
                >
                  {rowsAvailable ? "Confirmar horários" : "Solicitar disponibilidade"}
                </GradientButton>
              </div>
            </div>
          </div>
        </div>

        <ConfirmationDialog
          email={email ?? ""}
          open={confirmationOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          message={message}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Requisição de email enviada!
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default function AgendamentoBar() {
  return (
    <Suspense>
      <Agendamento />
    </Suspense>
  )
}
