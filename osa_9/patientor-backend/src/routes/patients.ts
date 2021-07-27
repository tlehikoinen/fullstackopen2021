import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req,res) => {
    res.send(patientService.getPatientsNoSsn());
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

export default router;