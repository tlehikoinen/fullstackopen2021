import React from "react";
import { HealthCheckEntry } from '../types';
import { useStateValue } from "../state";

const HealthCheckComp = ({entries}: {entries: HealthCheckEntry}): JSX.Element => {
    const [{ diagnosis }] = useStateValue();
    return (
        <>
            {entries.date} <span style={{fontStyle:'italic'}}>{entries.description}</span>
            <ul>
                {entries.diagnosisCodes?.map((d, idx) => {
                    return (
                        <li key={idx}>{d} {diagnosis.find(diagnose => diagnose.code === d)?.name}</li>
                    );
                })}
            </ul>
        </>
    );
};

export default HealthCheckComp;