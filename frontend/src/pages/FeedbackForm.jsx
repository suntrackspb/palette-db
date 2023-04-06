import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';

function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError('Заполните все поля формы');
      return;
    }
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setError('');
  };

  return (
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{ maxWidth: 400 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            multiline
            label="Сообщение"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Ваше сообщение успешно отправлено!</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button type="submit" variant="contained">
              Отправить
            </Button>
          </Box>
        </form>
      </Box>
      </Box>
  );
}

export default FeedbackForm;