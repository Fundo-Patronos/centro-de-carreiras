"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TimeIntervalsTable from '../../../components/DataTable';
import { Typography, Button, Snackbar, Alert } from '@mui/material';
import styles from '../../Agendamento.module.css';
import ConfirmationDialog from '../../../components/ConfirmationDialog';

interface Row {
  day: string;
  startTime: string;
  endTime: string;
}

const Agendamento = () => {
  const searchParams = useSearchParams();
  const mentor = searchParams.get('mentor'); // Get the 'mentor' value
  const email = searchParams.get('email'); // Get the 'email' value

  const [selectedRows, setSelectedRows] = useState<Row[]>([]);
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

  const handleConfirm = () => {
    //depois adicionar logica de enviar email automatico
    setConfirmationOpen(false);
    navigator.clipboard.writeText(message)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch(err => {
        console.error('Failed to copy message: ', err);
      });
  }

  const handleClose = () => {
    setConfirmationOpen(false);
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch(err => {
        console.error('Failed to copy message: ', err);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  if (!mentor) {
    return <p>Mentor não especificado.</p>;
  }

  return (
    <div className={styles.mainContainer}>
      <Typography variant="h3" gutterBottom align="center" style={{ color: '#2a2a72', fontWeight: 600 }}>
        Agendamento
      </Typography>
      <Typography variant="h4" gutterBottom align="center" style={{ color: '#2a2a72', fontWeight: 400 }}>
        Mostrando horários para {mentor}
      </Typography>

      <TimeIntervalsTable mentor={mentor} onSelectionChange={handleSelectionChange} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleButtonClick} 
          size="large"
          style={{ boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius: '8px'}}
        >
          Gerar Mensagem
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={message}
        />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
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
