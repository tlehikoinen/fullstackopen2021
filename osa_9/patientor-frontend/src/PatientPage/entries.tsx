import React from "react";
import { Entry } from "../types";
import HospitalEntry from "./hospitalEntry";
import HealthCheckEntry from "./healthCheckEntry";
import OccupationalHealthcareEntry from "./occupationalHealthcareEntry";

const Entries = ({ entries }: { entries: Entry[] }): JSX.Element => {
    return (
        <>
        <h3>Entries</h3>
        {entries?.map((e, idx) => {
          switch(e?.type) {
            case 'Hospital': {
                return (
                    <HospitalEntry key={idx} entries={e} />
                );
            }
            case 'HealthCheck': {
                return (
                    <HealthCheckEntry key={idx} entries={e} />
                );
            }
            case 'OccupationalHealthcare': {
                return (
                    <OccupationalHealthcareEntry key={idx} entries={e} />
                );
            }
            default: {
                return (
                  <></>
                );
            }
          }
        }
            
        )}
        </>
    );
        

};

export default Entries;