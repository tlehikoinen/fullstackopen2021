import React from 'react';
import { CoursePart } from '../Types'
import {  descriptionStyle, headerStyle, normalStyle } from '../Styles'

const Coursepart = ({ course }: {course: CoursePart}) => {
    switch(course.type) {
        case 'normal': {
          return (
            <div>
              <h3 style={headerStyle}>{course.name} {course.exerciseCount}</h3>
              <p style={descriptionStyle}>{course.description} </p>
            </div>
          )
        }
        case 'groupProject': {
          return (
            <div>
              <h3 style={headerStyle}>{course.name} {course.exerciseCount}</h3>
              <p style={descriptionStyle}>project exercises {course.groupProjectCount}</p>
            </div>
          )
        }
        case 'submission': {
          return (
            <div>
              <h3 style={headerStyle}>{course.name} {course.exerciseCount}</h3>
              <p style={descriptionStyle}>{course.description} </p>
              <p style={normalStyle}>submit to {course.exerciseSubmissionLink}</p>
            </div>
          )
        }
        case 'special': {
          return (
            <div>
              <h3 style={headerStyle}>{course.name} {course.exerciseCount}</h3>
              <p style={descriptionStyle}>{course.description}</p>
              <p style={normalStyle}>required skills: {course.requirements.slice().join(', ')}</p>
            </div>
          )
        }
    }
}

export default Coursepart