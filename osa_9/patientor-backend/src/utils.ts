import { NewPatientEntry, Gender } from "./types";

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
