import patientData from '../../data/patients';
import { PatientData, PublicPatient, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): PatientData[] => {
    return patientData;
};

const getPublicPatients = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation })=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientById = (id: string): PatientData | undefined => {
    const patient = patientData.find(p => p.id === id);
    return patient;
};

const addPatient = ( entry: NewPatientEntry ): PatientData => {
    const id = uuid();
    const newPatientEntry = {
        id: id,
        ...entry
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
};

export default { addPatient, getPatients, getPatientById, getPublicPatients };