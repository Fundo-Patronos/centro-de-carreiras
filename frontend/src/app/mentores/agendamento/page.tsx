"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import TimeIntervalsTable from '../../../components/DataTable';
import { Typography, Button, Snackbar, Alert } from '@mui/material';
import styles from '../../Agendamento.module.css';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import Layout from "@/components/Layout";

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
      <section className="relative z-[-2] w-full flex flex-col justify-center items-center text-center bg-white bg-cover bg-center"
        style={{ height: '300px' }}>
        <div
          className="absolute bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/background-mentors-opportunities.png')`,
            transform: 'rotate(-8deg)',
            backgroundSize: "cover",
            width: '125%',
            height: '170%',
            top: '-20px',
            left: '-398px',
            zIndex: -1,
          }}
        ></div>
        <div className="absolute inset-0 bg-white opacity-70"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
            Agendamento
          </h1>
          <p className="mt-4 text-2xl text-gray-700">Agende uma reunião com {mentor}</p>
        </div>
      </section>

      <div className={styles.mainContainer}>
        <div style={{ position: 'relative' }}>
          <TimeIntervalsTable mentor={mentor} onSelectionChange={handleSelectionChange} setRowsAvailable={setRowsAvailable} />

          {!rowsAvailable && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              flexDirection: 'column',
            }}>
              <Typography variant="h6" color="textSecondary" style={{ marginBottom: '16px' }}>
                Não há horários disponíveis para {mentor} no momento.
              </Typography>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRedirectToMentors}
                >
                  Ver Outros Mentores
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRequestAvailability}
                >
                  Pedir Disponibilidade
                </Button>
              </div>
            </div>
          )}
        </div>

        {rowsAvailable && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button
              variant="contained"
              color={selectedRows.length === 0 ? "inherit" : "primary"}
              onClick={handleButtonClick}
              size="large"
              disabled={selectedRows.length === 0}
              style={{ boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}
            >
              Selecionar Horários
            </Button>
          </div>
        )}

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
    </Layout>
  );
};

export default Agendamento;
