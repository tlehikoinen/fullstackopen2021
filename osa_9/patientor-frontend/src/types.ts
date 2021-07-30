export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface DiagnoseData {
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

export enum Type {
  Hospital = "Hospital",
  Occupational = "OccupationalHealthcare",
  HealthCheck = "HealthCheck"
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string, endDate: string}
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string, criteria: string }
}

export type Entry =
| undefined
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseData['code']>;
}

export interface EntryFormValues extends BaseEntry {
  type: string,
  discharge?: { date: string, criteria: string }
  employerName?: string;
  sickLeave?: {startDate: string, endDate: string};
  healthCheckRating?: HealthCheckRating;
}

export interface Sickleave {
  startDate: string, 
  endDate: string
}

export interface Discharge {
  date: string,
  criteria: string
}



// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type NewHospitalEntryValues = Omit<HospitalEntry, "id">;
export type NewHealthCheckEntryValues = Omit<HealthCheckEntry, "id">;
export type NewOccupationalHealthcareEntryValues = Omit<OccupationalHealthcareEntry, "id">;

