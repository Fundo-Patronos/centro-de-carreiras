"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import TimeIntervalsTable from '../../../components/DataTable';
import { Typography, Snackbar, Alert } from '@mui/material';
import styles from '../../Agendamento.module.css';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import Layout from "@/components/Layout";
import { Button, Checkbox } from "@mui/material";
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';


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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section with Enhanced Visual Appeal */}
      <section className="relative h-80 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.svg')]" />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Agende uma reunião
            </h1>
          </div>
          <p className="text-xl text-gray-600 flex items-center gap-2">
            com <span className="font-semibold text-purple-600">{mentor}</span>
          </p>
        </div>
      </section>

      {/* Schedule Selection Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
          {/* Schedule Header */}
          <div className="p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-800">Horários Disponíveis</h2>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Selecione os horários que melhor se adequam à sua agenda</span>
              </div>
            </div>

            {rowsAvailable ? (
              <div style={{ backgroundColor: '#ffffff', padding: '30px' }}>
              <div style={{ position: 'relative' }}>
                <TimeIntervalsTable mentor={mentor} onSelectionChange={handleSelectionChange} setRowsAvailable={setRowsAvailable} />
              </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Não há horários disponíveis
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  No momento não existem horários disponíveis para este mentor.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="outline"
                className="text-purple-600 hover:bg-purple-50"
                onClick={handleRedirectToMentors}
              >
                Ver Outros Mentores
              </Button>
              <Button
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-shadow"
                disabled={rowsAvailable && !(selectedRows.length > 0)}
                onClick={rowsAvailable? handleButtonClick : handleRequestAvailability}
              >
                {rowsAvailable ? "Confirmar Horários" : "Pedir disponibilidade"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationDialog
          email={email}
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
  );
};

export default Agendamento;
