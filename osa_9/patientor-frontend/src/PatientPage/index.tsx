import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Patient, EntryWithoutId } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientData, addEntry } from "../state";
import { Icon, Button } from 'semantic-ui-react';
import Entries from "./entries";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
  
    const submitNewEntry = async (entries: EntryWithoutId) => {
      try {
        const { data: newEntry } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}`,
          entries
        );
        dispatch(addEntry(newEntry));
        closeModal();
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data || 'Unknown error');
      }
    };

    React.useEffect(() => {
        const fetchPatientData = async () => {
            try {
                console.log('fetching patient info');
                const { data: patientData } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`);
                dispatch(setPatientData(patientData));
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
            {patient?.entries === undefined || patient.entries.length === 0  
            ? <p>no entries found</p>
            : <Entries entries={patient.entries} />}

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>

            
        </div>
    );
};

export default PatientPage;