import React from "react";
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";
import { Icon, Segment } from "semantic-ui-react";

const HospitalComp = ({ entries }: { entries: HospitalEntry }): JSX.Element => {
    const [{ diagnosis }] = useStateValue();
    return (
        <Segment>
            <div>
              {entries.date} <Icon name="plus square" size="large" title={entries.type} /> 
            </div>
            <span style={{fontStyle:'italic'}}>{entries.description}</span>
            <ul key={entries.date}>
                {entries.diagnosisCodes?.map((d, idx) => {
                    return (
                    <li key={idx}>{d} {diagnosis.find(diagnose => diagnose.code === d)?.name}</li>
                    );
                })}
            </ul>
            Discharge Date: {entries.discharge.date}<br/>
            Discharge Criteria: {entries.discharge.criteria}
        </Segment>
    );
};

export default HospitalComp;