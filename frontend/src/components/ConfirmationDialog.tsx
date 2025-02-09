import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
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
  const [subject, setSubject] = useState<string>(`[Centro de Carreiras Patronos] Agendamento de Mentoria com ${useAuthStore((state) => state.username)}`);
  const [body, setBody] = useState<string>(message); // Usando o `message` vindo das props como valor inicial
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const userEmail = useAuthStore((state) => state.email) || 'user@domain.com';
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
        const response = await axios.get("/api");
        setApiUrl(response.data.apiUrl);
      } catch {
        console.error("Erro ao carregar a URL da API.");
      }
    };
    fetchApiUrl();
  }, []);

  useEffect(() => {
    setBody(message);
  }, [message]);


  const handleSendEmail = async () => {
    try {
      const emailData = {
        email: mentorEmail,
        subject,
        body, // Agora usamos o valor editado do corpo da mensagem
        copy_emails: [userEmail],
      };

      await axios.post(`${apiUrl}/mentoring/send_mentoring_email`, emailData, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      setSnackbarMessage('Email enviado com sucesso!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      setSnackbarMessage('Erro ao enviar o email. Tente novamente mais tarde.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="confirmation-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="confirmation-dialog-title">
          Editar e enviar e-mail
        </DialogTitle>
        <DialogContent>
          {/* Destinatário */}
          <TextField
            fullWidth
            disabled
            label="Destinatário"
            value={mentorEmail}
            margin="dense"
            variant="outlined"
          />

          {/* Assunto */}
          <TextField
            fullWidth
            label="Assunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="dense"
            variant="outlined"
          />

          {/* Corpo do e-mail */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Corpo do e-mail"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            margin="dense"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions className="flex justify-end gap-3 w-full pr-4">
          <Button
              onClick={onConfirm}
              color="primary"
              variant="outlined"
              className="flex-1 text-center px-6 py-2 max-w-[150px] text-purple-600 hover:bg-purple-50"
          >
              Fechar
          </Button>
          <GradientButton
              onClick={handleSendEmail}
              className="flex-1 text-center px-6 py-2 max-w-[150px] bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:shadow-lg transition-shadow"
          >
              Enviar e-mail
          </GradientButton>
        </DialogActions>

      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
