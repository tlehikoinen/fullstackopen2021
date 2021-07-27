
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface PatientData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type PatientDataNoSsn = Omit<PatientData, 'ssn'>;
export type NewPatientEntry = Omit<PatientData, 'id'>;

export interface DiagnoseData {
    code: string;
    name: string;
    latin?: string;
}