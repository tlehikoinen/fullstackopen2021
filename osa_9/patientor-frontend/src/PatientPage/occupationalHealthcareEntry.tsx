import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { Icon, Segment } from 'semantic-ui-react';

const OccupationalHealthcareComp = ({entries}: {entries: OccupationalHealthcareEntry}): JSX.Element => {
    const [{diagnosis}] = useStateValue();
    return (
        <Segment>
            <div>
              {entries.date} 
              <Icon name="user md" size="large" title={entries.type} /> 
              <span style={{fontSize: '20px', fontWeight:'bold'}}>{entries.employerName}</span>
            </div>
            <span style={{fontStyle:'italic'}}>{entries.description}</span>
            <ul>
                {entries.diagnosisCodes?.map((d, idx) => {
                    return (
                        <li key={idx}>{d} {diagnosis.find(diagnose => diagnose.code === d)?.name}</li>
                    );
                })}
            </ul>
            {entries.sickLeave ? <div>Sickleave: {entries.sickLeave.startDate} - {entries.sickLeave.endDate}</div> : null}
        </Segment>
    );
};

export default OccupationalHealthcareComp;