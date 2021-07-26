import express from 'express';
const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req,res) => {
  const { weight, height } = req.query;

  const bmi = calculateBmi(Number(height), Number(weight));

  const result = bmi === 'Malformatted parameters' 
  ? { error: 'Malformatted parameters'} 
  : {
    weight,
    height,
    bmi
  };
  return res.send(result);
});

app.post('/exercisecalculator', (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.send({ error: 'Parameters missing'});
  }
  if (Array.isArray(daily_exercises)) {
    let isNumber = true;
    daily_exercises.forEach(d => {
      if (typeof d !== 'number') {
        isNumber = false;
      }
    });
    if (!isNumber && daily_exercises.length > 0 || typeof target !== 'number') {
      return res.send({ error: 'Malformatted parameters' });
    }
  }
  try {
    const result = calculateExercises(daily_exercises, target);
    return res.send(result);
  } catch (e) {
    return res.send({ error: 'Something went wrong' });
  } 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 