import React from 'react'

const Course = (props) => (
  props.courses.map((course) =>
    <ul key={course.id}>
      <Header courseName={course.name} />
      <Content partInfo={course.parts} />
      <Total partInfo={course.parts} />
    </ul>
  )
)

const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ partInfo }) => (
  <>
    {partInfo.map((part) =>
      <Part key={part.id} part={part} />)}
  </>
)

const Part = (props) => (
  <li>
    {props.part.name} {props.part.exercises}
  </li>
)

const Total = ({ partInfo }) => {
  var totalPoints = partInfo.reduce((sum, item) => {
    return sum + item.exercises
  }, 0)

  return (
    <h4>Total of {totalPoints} exercises</h4>
  )
}


const App = () => {
  const courses = [
    {
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
          name: 'Redux',
          exercises: 3,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }

  ]
  return (
    <div>
      <Course key={courses.id} courses={courses} />
    </div>
  )
}

export default App