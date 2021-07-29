import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req,res) => {
    res.send(patientService.getPublicPatients());
});

router.get('/:id', (req,res) => {
    try {
      res.send(patientService.getPatientById(req.params.id));
    } catch(e) {
        res.status(404).send(e.message);
    }
});

router.post('/', (req,res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedPatient = patientService.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/:id', (req,res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addPatientEntry(req.params.id, newEntry);
        console.log('after added entry', addedEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;