import express from 'express';
const app = express();
import * as cors from 'cors';
app.use(express.json());
app.use(cors.default());

const PORT = 3002;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });