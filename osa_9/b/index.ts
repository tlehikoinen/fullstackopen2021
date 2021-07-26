import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator'

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {


  const weight: number = Number(req.query.weight);
  const height: number = Number(req.query.height);
  const bmi = calculateBmi(height, weight);

  const result = bmi === 'Malformatted parameters' 
  ? { error: 'Malformatted parameters'} 
  : {
    weight,
    height,
    bmi
  }
  return res.send(result)
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 