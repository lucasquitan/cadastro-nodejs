import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.APPLICATION_PORT;
app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}! ✨`);
  console.log(`http://localhost:${port}`);
});
