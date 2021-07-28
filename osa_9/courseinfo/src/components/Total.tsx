import React from "react";
import { CoursePart } from "../Types";

const Total = ( { courseParts }: {courseParts: Array<CoursePart>}) => {
    const totalExercises = courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)
    return (
        <>
          <p>Number of exercises {totalExercises}</p>
        </>
    )

}

export default Total;

