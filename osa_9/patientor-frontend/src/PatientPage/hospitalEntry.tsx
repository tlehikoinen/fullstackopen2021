import React from "react";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

const HospitalComp = ({ entries }: { entries: HospitalEntry }): JSX.Element => {
    const [{ diagnosis }] = useStateValue();
    return (
        <>
            {entries.date} <span style={{fontStyle:'italic'}}>{entries.description}</span>
            <ul key={entries.date}>
                {entries.diagnosisCodes?.map((d, idx) => {
                    return (
                    <li key={idx}>{d} {diagnosis.find(diagnose => diagnose.code === d)?.name}</li>
                    );
                })}
            </ul>
        </>
    );
};

export default HospitalComp;