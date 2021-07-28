
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientData {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries?: Entry[] 
}

export type PublicPatient = Omit<PatientData, 'ssn' | 'entries' >;
export type NewPatientEntry = Omit<PatientData, 'id'>;

export interface DiagnoseData {
    code: string;
    name: string;
    latin?: string;
}