import express from 'express';
const app = express();
import * as cors from 'cors';
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';
app.use(express.json());
app.use(cors.default());

const PORT = 3002;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
  });

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });