import React from "react";
import Coursepart from "./Coursepart";
import { CoursePart } from '../Types'

const Content = ( { courseParts }: { courseParts: Array<CoursePart>})  => {
  return (
    <>
      {courseParts.map(c => 
        <Coursepart
          key={c.name}
          course={c}
        />)
      }
    </>
    )
}



export default Content;