import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from '../state';
import { TextField, DiagnosisSelection } from "./FormField";
import { EntryWithoutId, Type } from "../types";

interface Props {
    onSubmit: (values: EntryWithoutId) => void;
    onCancel: () => void;
  }

// const typeOptions: TypeOption[] = [
//   { value: Type.Hospital, label: "Hospital"},
//   { value: Type.HealthCheck, label: "HealthCheck"},
//   { value: Type.Occupational, label: "OccupationalHealthCheck"}
// ];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis }] = useStateValue();

    return (
      <Formik
      initialValues={{
        description:"",
        date:"",
        specialist:"",
        discharge:{date:"", criteria:""},
        type: Type.Hospital,
      }}
      onSubmit={onSubmit}
      validate={values => {
          const requiredError= "Field is required";
          const errors: { [field: string]: string } = {};
          if(!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
              errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if(!values.specialist) {
            errors.specialist = requiredError;
          }
          if(!values.discharge.date) {
            errors.discharge = requiredError;
          }
          if(!values.discharge.criteria) {
            errors.discharge = requiredError;
          }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
              {/* <SelectField
                label="Type"
                name="type"
                options={typeOptions}
              /> */}
            <Field 
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field 
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field 
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field 
              label="DischargeDate"
              placeholder="Discharge Date"
              name="discharge.date"
              component={TextField}
            />
             <Field 
              label="DischargeCriteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
            />
  
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />    

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddEntryForm;