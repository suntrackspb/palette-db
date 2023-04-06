import {Alert, Typography} from "@mui/material";

const ErrorBlock = () => {
  return (
    <Alert variant="outlined" severity="error" sx={{margin: '200px auto', maxWidth: '300px', justifyContent: 'center', alignItems: 'center'}}>
      <Typography color='red'>
        Ошибка загрузки данных
      </Typography>
    </Alert>
  );
};

export default ErrorBlock;