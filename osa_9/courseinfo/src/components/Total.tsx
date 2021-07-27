import React from "react";
import { CourseProps } from "../Types";

const Total = ( { courseParts }: {courseParts: Array<CourseProps>}) => {
    const totalExercises = courseParts.reduce((carry: number, part: CourseProps) => carry + part.exerciseCount, 0)
    return (
        <>
          <p>Number of exercises {totalExercises}</p>
        </>
    )

}

export default Total;

