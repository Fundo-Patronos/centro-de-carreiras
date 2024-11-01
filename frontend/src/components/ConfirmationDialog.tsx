import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Import copy icon
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
import Alert from '@mui/material/Alert'; // Import Alert for Snackbar

interface ConfirmationDialogProps {
  email: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export default function ConfirmationDialog({ email, open, onClose, onConfirm, message }: ConfirmationDialogProps) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setSnackbarMessage('Email copiado para a área de transferência');
    setSnackbarOpen(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setSnackbarMessage('Mensagem copiada para a área de transferência');
    setSnackbarOpen(true);
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
          Confirmar email a ser enviado para {email}:
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong>
          </Typography>
          <Paper variant="outlined" sx={{ padding: '8px', marginBottom: '16px', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{email}</span>
            <Tooltip title="Copiar email">
              <IconButton
                onClick={handleCopyEmail}
                sx={{ color: 'blue' }} // Change icon color
                size="small"
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Paper>

          <Typography variant="body1" gutterBottom>
            <strong>Mensagem:</strong>
          </Typography>
          {/* Box around message */}
          <Paper variant="outlined" sx={{ padding: '8px', marginBottom: '16px', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <DialogContentText id="confirmation-dialog-description">
              {message}
            </DialogContentText>
            <Tooltip title="Copiar mensagem">
              <IconButton
                onClick={handleCopyMessage}
                sx={{ color: 'blue' }} // Change icon color
                size="small"
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} color="primary" variant="contained">
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