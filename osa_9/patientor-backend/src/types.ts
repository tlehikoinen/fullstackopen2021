
export type Gender = 'male' | 'female';

export interface PatientData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PatientDataNoSsn = Omit<PatientData, 'ssn'>;

export interface DiagnoseData {
    code: string;
    name: string;
    latin?: string;
}