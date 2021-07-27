import patientData from '../../data/patients';
import { PatientData, PatientDataNoSsn, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): PatientData[] => {
    return patientData;
};

const getPatientsNoSsn = (): PatientDataNoSsn[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation })=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
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

export default { addPatient, getPatients, getPatientsNoSsn };