
export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface

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

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseData['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: { startDate: string, endDate: string}
  }

  interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: { date: string, criteria: string }
  }

  export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
