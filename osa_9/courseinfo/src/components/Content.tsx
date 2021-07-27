import React from "react";
import Coursepart from "./Coursepart";
import { CourseProps } from '../Types'

const Content = ( { courseParts }: {courseParts: Array<CourseProps>}) => {
  return (
    <>
      {courseParts.map((c) =>
        <Coursepart
          key={c.name}
          name={c.name}
          exerciseCount={c.exerciseCount} 
        />)
      }
    </>
    )
}



export default Content;