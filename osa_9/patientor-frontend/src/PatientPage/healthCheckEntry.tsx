import React from "react";
import { HealthCheckEntry } from '../types';
import { useStateValue } from "../state";
import { Icon, Segment } from "semantic-ui-react";
import HealthRateHeart from "./HealthRateHeart";

const HealthCheckComp = ({entries}: {entries: HealthCheckEntry}): JSX.Element => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Segment>
            <div>
              {entries.date} 
              <Icon name="stethoscope" size="large" title={entries.type}/> 
            </div>
            <span style={{fontStyle:'italic'}}>{entries.description}</span>
            <ul>
                {entries.diagnosisCodes?.map((d, idx) => {
                    return (
                        <li key={idx}>{d} {diagnosis.find(diagnose => diagnose.code === d)?.name}</li>
                    );
                })}
            </ul>
            <HealthRateHeart healthrating={entries.healthCheckRating} />
        </Segment>
    );
};

export default HealthCheckComp;