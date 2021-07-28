import React from "react";
import { HealthCheckEntry } from '../types';

const HealthCheckComp = ({entries}: {entries: HealthCheckEntry}): JSX.Element => {
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

export default HealthCheckComp;