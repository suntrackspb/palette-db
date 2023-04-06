import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import {CAPTCHA_SITE_KEY} from "../consts/index.js";
import ReCAPTCHA from "react-google-recaptcha";


function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaValue) {
      setError('Пожалуйста, подтвердите, что вы не робот!');
      return;
    }
    if (!name || !email || !message) {
      setError('Заполните все поля формы');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': 'DevSecretApiKey' },
        body: JSON.stringify({ name, email, message, captchaValue }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки данных формы');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setError('');

    } catch (err) {
      setError(err.message);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setError(null);
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
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <ReCAPTCHA
              sitekey={CAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
          </Box>
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