import patientData from '../../data/patients';
import { PatientData, PatientDataNoSsn } from '../types';

//const patients: Array<PatientData> = patientData as Array<PatientData>;

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


export default { getPatients, getPatientsNoSsn };