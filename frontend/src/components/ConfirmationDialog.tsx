import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import GradientButton from '@/components/GradientButton';


interface ConfirmationDialogProps {
  email: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmationDialog({ email: mentorEmail, open, onClose, onConfirm, message }: ConfirmationDialogProps) {
    const [apiUrl, setApiUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchApiUrl = async () => {
        try {
            const response = await axios.get("/api");
            const url = response.data.apiUrl;
            setApiUrl(url);
        } catch {
            console.error("Erro ao carregar a URL da API.");
        }
        };

        fetchApiUrl();
    }, []);
      
  const username = useAuthStore((state) => state.username) || 'Visitante';
  const userEmail = useAuthStore((state) => state.email) || 'user@domain.com';
  const accessToken = useAuthStore((state) => state.accessToken);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleSendEmail = async () => {
    try {
      const emailData = {
        email: mentorEmail, // Mentor email
        subject: `Agendamento de Mentoria com ${username}`,
        body: message,
        copy_emails: [userEmail], 
      };

      await axios.post(`${apiUrl}/mentoring/send_mentoring_email`, emailData, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      setSnackbarMessage('Email enviado com sucesso!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      setSnackbarMessage('Erro ao enviar o email. Tente novamente mais tarde.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="confirmation-dialog-title">
          Confirmar email a ser enviado para {mentorEmail}:
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong>
          </Typography>
          <Paper variant="outlined" sx={{ padding: '8px', marginBottom: '16px', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{mentorEmail}</span>
          </Paper>

          <Typography variant="body1" gutterBottom>
            <strong>Mensagem:</strong>
          </Typography>
          {/* Box around message */}
          <Paper variant="outlined" sx={{ padding: '8px', marginBottom: '16px', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DialogContentText id="confirmation-dialog-description">
              {message}
            </DialogContentText>
          </Paper>
        </DialogContent>
        <DialogActions className="flex gap-6 w-full justify-end">
            <GradientButton onClick={handleSendEmail} className="flex-1 text-center px-4 py-2 max-w-[200px]">
                Enviar Email
            </GradientButton>
            <Button onClick={onConfirm} color="primary" variant="contained" className="flex-1 text-center px-4 py-2 max-w-[200px]">
                Fechar
            </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for copy feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}