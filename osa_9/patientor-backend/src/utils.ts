import { DiagnoseData, Discharge, Gender, EntryWithoutId, HealthCheckRating, NewHospitalEntryValues, NewHealthCheckEntryValues, NewOccupationalHealthcareEntryValues, NewPatientEntry, Sickleave} from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newPatient: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        ssn: parseSsn(object.ssn),

    };
    return newPatient;
};

export const toNewEntry = (entry: EntryWithoutId): EntryWithoutId => {
    switch(entry.type) {
        case 'HealthCheck': {
            const newEntry: NewHealthCheckEntryValues = {
                type: "HealthCheck",
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                diagnosisCodes: parseDiagnoseCodes(entry.diagnosisCodes),
                healthCheckRating: parseHealthRating(entry.healthCheckRating)
            };
            return newEntry;
        }
        case 'OccupationalHealthcare': {
            const newEntry: NewOccupationalHealthcareEntryValues = {
                type: "OccupationalHealthcare",
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                diagnosisCodes: parseDiagnoseCodes(entry.diagnosisCodes),
                employerName: parseEmployerName(entry.employerName),
                sickLeave: parseSickleave(entry.sickLeave),
            };
            return newEntry;
        }
        case 'Hospital': {
            const newEntry: NewHospitalEntryValues = {
                type: "Hospital",
                discharge: parseDischarge(entry.discharge),
                description: parseDescription(entry.description),
                date: parseDate(entry.date),
                specialist: parseSpecialist(entry.specialist),
                diagnosisCodes: parseDiagnoseCodes(entry.diagnosisCodes),
            };
            return newEntry;
          }
        default: {
            return entry;
        }

    }
};

const arrayContainsStrings = (array:Array<string>) => {
    return array.every(i => (typeof i === "string"));
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isSsn = (ssn: any): boolean => {
    // Not going any deeper on checking whether 'hetu' is correct or not
    return ssn.length === 11;
};

const parseDate = (date: string): string => {
    if (!date || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    } 
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: '+ gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseSsn = (ssn: string): string => {
    if (!ssn || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseDescription = (description: string): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};

const parseSpecialist = (specialist: string): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    } 
    return specialist;
};

const parseEmployerName = (employerName: string): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
};

const parseDischarge = (discharge: Discharge): Discharge => {
    if (!discharge.date || !isString(discharge.date) || !discharge.criteria) {
        throw new Error('Incorrect or missing discharge');
    }
    return discharge;
};

const parseDiagnoseCodes = (diagnoseCodes: Array<DiagnoseData['code']> | undefined): Array<DiagnoseData['code']> | undefined => {
    // if diagnoseCodes not undefined, checks it is an array and contains only strings
    if(diagnoseCodes === undefined) {
        return diagnoseCodes;
    }
    if (!Array.isArray(diagnoseCodes) || !arrayContainsStrings(diagnoseCodes) ) {
        throw new Error('Incorrect form for diagnose codes');
    }
    return diagnoseCodes;
};

const parseSickleave = (sickleave: Sickleave | undefined): Sickleave | undefined => {
    if(sickleave === undefined) {
        return sickleave;
    }
    if (!sickleave || !isString(sickleave.startDate) || !isString(sickleave.endDate)) {
        throw new Error ('Incorrect sickleave data');
    }
    return sickleave;
};

const parseHealthRating = (rating: HealthCheckRating): HealthCheckRating => {
    if (rating === 0) {
        return rating;
    }
    if (!rating || !Object.values(HealthCheckRating).includes(rating)) {
        throw new Error('Incorrect or missing health rating');
    } 
    return rating;
};