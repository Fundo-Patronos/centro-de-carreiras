"use client";

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TimeIntervalsTable from '../../../components/DataTable.js';
import { Typography, Button, Snackbar, Alert } from '@mui/material';

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

  const handleSelectionChange = (newSelection: Row[]) => {
    setSelectedRows(newSelection);
  };

  const handleButtonClick = () => {
    const timeIntervals = selectedRows.map((row: Row) => `${row.day} ${row.startTime} - ${row.endTime}`);
    const generatedMessage = `Prezado ${mentor},\nEstou mandando esta mensagem a partir do site do centro de carreiras e quero marcar uma reunião nos horários: ${timeIntervals.join(', ')}.\n\nAtenciosamente,\n`;
    setMessage(generatedMessage);
  };

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
    <div>
      <Typography variant="h3" gutterBottom align="center">
        Agendamento
      </Typography>
      <Typography variant="h4" gutterBottom align="center">
        Mostrando horários para {mentor}
      </Typography>

      <TimeIntervalsTable mentor={mentor} onSelectionChange={handleSelectionChange} />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleButtonClick} 
          size="large"
        >
          Gerar Mensagem
        </Button>
      </div>

      {message && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Email para {email}
          </Typography>

          <div style={{ 
            padding: '20px',
            border: '1px solid #ccc', 
            borderRadius: '8px',
            backgroundColor: '#fff',
            width: '600px',
            margin: '0 auto',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
              {message}
            </Typography>
            
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleCopyToClipboard} 
              style={{ marginTop: '20px' }}
            >
              Copiar para Área de Transferência
            </Button>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Mensagem copiada com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Agendamento;
