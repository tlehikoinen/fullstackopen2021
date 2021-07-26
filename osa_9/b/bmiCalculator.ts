const calculateBmi = (heightCm: number, weightKg: number):string => {
    const bmiValue =  weightKg / (heightCm/100) ** 2
    console.log(bmiValue)

    if (bmiValue < 18.5) return 'Underweight'
    if (bmiValue >= 18.5 && bmiValue < 25 ) return 'Normal (healthy weight)'
    if (bmiValue >= 25 && bmiValue < 30) return 'Overweight'
    if (bmiValue >=30) return 'Obese (heavily overweight)'
}

console.log(calculateBmi(180, 74))