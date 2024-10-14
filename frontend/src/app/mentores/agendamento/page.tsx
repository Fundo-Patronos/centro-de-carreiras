"use client";

import { useSearchParams } from 'next/navigation';
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
    <Layout currentPage="mentores"> {/* Pass the currentPage prop */}
      {/* First Section with Background Image, Opacity Layer, and Rotation */}
      <section className="relative z-[-2] w-full flex flex-col justify-center items-center text-center bg-white bg-cover bg-center"
        style={{
          height: '300px', // Adjusted height for a more compact section
        }}>

        {/* Background Image */}
        <div
          className="absolute bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/background-mentors-opportunities.png')`,
            transform: 'rotate(-5deg)', // Rotate the background image only
            backgroundSize: "cover",
            width: '170%',  // Increase the width slightly
            height: '170%', // Increase the height slightly
            top: '-20px',   // Adjust the position upwards a bit
            left: '-500px',  // Move the image more to the left
            zIndex: -1,     // Ensure it's behind the content
          }}
        ></div>


        {/* Layer with opacity for text readability */}
        <div className="absolute inset-0 bg-white opacity-70"></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
            Agendamento
          </h1>
          <p className="mt-4 text-2xl text-gray-700">
            Agende uma reunião com {mentor}
          </p>
        </div>
      </section>


      <div className={styles.mainContainer}>
        <TimeIntervalsTable mentor={mentor} onSelectionChange={handleSelectionChange} />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleButtonClick}
            size="large"
            style={{ boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius: '8px' }}
          >
            Selecionar Horários
          </Button>
        </div>

        {/* Confirmation Dialog */}
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
