import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Form, Formik } from "formik";
import { useStateValue } from '../state';
import { DiagnosisSelection, NumberField, SelectField, TextField, TypeOption } from "./FormField";
import { EntryFormValues, Type } from "../types";
import { isDate } from '../Utils';

interface Props {
  onSubmit: (values: EntryFormNoId) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.HealthCheck, label: "HealthCheck" },
  { value: Type.Occupational, label: "OccupationalHealthCheck" }
];
type EntryFormNoId = Omit<EntryFormValues, "id">;

const HospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();

  const initialValues: EntryFormNoId = {
    description: "",
    specialist: "",
    date: "",
    discharge: {
      date: "",
      criteria: "",
    },
    sickLeave: {
      startDate: "",
      endDate: ""
    },
    employerName: "",
    healthCheckRating: 0,
    type: Type.Hospital,
  };

  return (
    <Formik
      initialValues=
      {initialValues}
      onSubmit={onSubmit}
      validate={(values: EntryFormNoId) => {
        const requiredError = "Field is required";
        const dateError = "Date must be in form YYYY-MM-DD and legit";
        let errors:
          | { [field: string]: string }
          | {
            [key: string]: {
              [key: string]: string;
            };
          } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if(!isDate(values.date)) {
          errors.date = values.date ? dateError : requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.type === 'Hospital') {
          if (!values.discharge?.date) {
            errors = {
              ...errors,
              discharge: {
                date: requiredError,
                criteria: !values.discharge?.criteria ? requiredError : ''
              }
            };
          }
          if (values.discharge?.date && !isDate(values.discharge?.date)) {
            errors = {
              ...errors,
              discharge: {
                date: dateError,
                criteria: !values.discharge?.criteria ? requiredError : ''
              }
            };
          }
          if (!values.discharge?.criteria) {
            errors = {
              ...errors,
              discharge: {
                date: values.discharge?.date ? ((values.discharge?.date && isDate(values.discharge?.date)) ? '' : dateError) : requiredError,
                criteria: requiredError
              }
            };
          }
        }

        if (values.type === 'OccupationalHealthcare') {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }

          if (values.sickLeave?.endDate && !isDate(values.sickLeave?.endDate)) {
            errors = {
              ...errors,
              sickLeave: {
                endDate: dateError,
                startDate: values?.sickLeave?.startDate ? ((values.sickLeave?.startDate && isDate(values.sickLeave?.startDate)) ? '' : dateError) : '',
              }
            };
          }
          
          if (values.sickLeave?.startDate && !isDate(values.sickLeave?.startDate)) {
            errors = {
              ...errors,
              sickLeave: {
                startDate: dateError,
                endDate: values?.sickLeave?.endDate ? ((values.sickLeave?.endDate && isDate(values.sickLeave?.endDate)) ? '' : dateError) : '',
              }
            };
          }
        }

        if(values.type === 'HealthCheck') {
          if (values.healthCheckRating && (values.healthCheckRating > 3 || values.healthCheckRating < 0)) {
            errors.healthCheckRating = 'HealthCheck rating must be between 0 - 3';
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
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
            {values.type === 'Hospital' &&
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge criteria"
                  name='discharge.criteria'
                  component={TextField}
                />
              </>
            }
            {values.type === 'OccupationalHealthcare' &&
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sickleave start date"
                  placeholder="Sickleave start date"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sickleave end date"
                  placeholder="Sickleave end date"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }
            {values.type === 'HealthCheck' &&
              <>
                <Field
                  label="healthCheckRating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              </>
            }

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

export default HospitalEntryForm;