type exerciseHours = Array<number>;
type ratingDescriptions = 'not enough' | 'not too bad but could be better' | 'well done'; 
type ratingValues = 1 | 2 | 3;
interface exerciseCalculatorResult {
    periodLength: number,
    trainingDays: 0 | number,
    success: boolean,
    rating: ratingValues,
    ratingDescription: ratingDescriptions,
    target: number
    average: number
}

const calculateExercises = (exerciseData: Array<number>, target: number): exerciseCalculatorResult  => {

    const periodLength = exerciseData.length;
    const trainingDays = exerciseData.reduce((count, currentValue) => {
        if (currentValue != 0) return count += 1;
        else return count;
        }, 0);
    const exerciseHoursTotal = exerciseData.reduce((hours, currentValue) => {
        return hours + currentValue;
    });
    const average = exerciseHoursTotal / periodLength;
    const success = average >= target ? true : false;
    const rating = (average/target >= 1) ? 3 : (average/target > 0.67) ? 2 : 1;
    const ratingDescription = rating === 3 ? 'well done' : rating === 2 ? 'not too bad but could be better' : 'not enough';
    
    return {
        periodLength, trainingDays, success, rating, ratingDescription, target, average
    };
};

const target: number = parseInt(process.argv[2]);
const exerciseData: exerciseHours = [];
process.argv.slice(3).forEach(number => exerciseData.push(Number(number)));

console.log(calculateExercises(exerciseData, target));