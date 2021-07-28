import React from "react";
import { HospitalEntry } from "../types";

const HospitalComp = ({entries}: { entries: HospitalEntry}): JSX.Element => {
    return (
        <>
            {entries.date} <span style={{fontStyle:'italic'}}>{entries.description}</span>
            <ul key={entries.date}>
                {entries.diagnosisCodes?.map((d, idx) => {
                    return (
                    <li key={idx}>{d}</li>
                    );
                })}
            </ul>
        </>
    );
};

export default HospitalComp;