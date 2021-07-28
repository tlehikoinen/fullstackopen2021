import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';

const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatientData = async () => {
            try {
                console.log('fetching patient info');
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`);
                dispatch({type: "SET_PATIENT_DATA", payload: patientData});
            } catch (e) {
                console.error(e);
            }
        };
        if (patient?.id === id) {
            return;
        } else {
            void fetchPatientData();
        }
    
    }, [dispatch, id, patient]);


    const gendericon = () => {
        switch(patient?.gender) {
          case 'male': {
              return <Icon name="mars" size="large"/>;
          }
          case 'female': {
              return <Icon name="venus" size="large" />;
          }
          case 'other': {
              return <Icon name="genderless" size="large" />;
          }
          default: {
              return null;
          }
        }
    };

    return (
        <div>
            <h1>{patient?.name} {gendericon()} </h1>
            ssn: {patient?.ssn} <br/>
            occupation: {patient?.occupation}
        </div>
    );
};

export default PatientPage;