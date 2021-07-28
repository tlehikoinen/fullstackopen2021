import React from "react";
import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareComp = ({entries}: {entries: OccupationalHealthcareEntry}): JSX.Element => {
    return (
        <>
            {entries.date} <span style={{fontStyle:'italic'}}>{entries.description}</span>
            <ul>
                {entries.diagnosisCodes?.map((d, idx) => {
                    return (
                        <li key={idx}>{d}</li>
                    );
                })}
            </ul>
        </>
    );
};

export default OccupationalHealthcareComp;