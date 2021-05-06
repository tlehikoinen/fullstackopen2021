import React from 'react'

const Course =(props) => {
  return (
    <div>
        <Header courseName = {props.course.name} />
        <Content partInfo = {props.course.parts} />
        <Total partInfo = {props.course.parts} />
    </div>
  )
}

const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({partInfo}) => (
  <ul>
    {partInfo.map((part, i) =>
      <Part key={i} part={part}/>)}
  </ul>

)

const Part = (props) => (
  <li>
    {props.part.name} {props.part.exercises}
  </li>
  )
  
const Total = ({partInfo}) => {
  var totalPoints = partInfo.reduce((sum, item) => {
    return sum + item.exercises
  }, 0)
  return (
    <h4>Total of {totalPoints} exercises</h4>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'New addition',
        exercises: 1,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App