import patientData from '../../data/patients';
import { PatientData, PublicPatient, NewPatientEntry, EntryWithoutId, Entry } from '../types';
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
    if(!patient) {
        throw new Error('Not found');
    }
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

const addPatientEntry = ( patientId: string, entry: EntryWithoutId): PatientData | undefined => {
    const id:string = uuid();
    const newEntry: Entry = {
        ...entry,
        id: id
    };
    patientData.find(p => p.id === patientId)?.entries?.push(newEntry);
    const patient = patientData.find(p => p.id === patientId);
    return patient;
};

export default { addPatient, addPatientEntry, getPatients, getPatientById, getPublicPatients };