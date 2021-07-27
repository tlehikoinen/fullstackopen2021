import React from 'react';
import { CourseProps } from '../Types'

const Coursepart = ({name, exerciseCount}: CourseProps) => {
    return <p>{name} {exerciseCount}</p>
}

export default Coursepart