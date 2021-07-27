import diagnoseData from '../../data/diagnoses.json';
import { DiagnoseData } from '../types';

const diagnoses: Array<DiagnoseData> = diagnoseData;

const getDiagnoses = (): Array<DiagnoseData> => {
    return diagnoses;
};

export default { getDiagnoses };