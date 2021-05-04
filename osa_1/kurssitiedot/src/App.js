import React from 'react'


const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1}/>
      <Part part={props.part2}/>
      <Part part={props.part3}/>
    </>
  )
}

const Part = (props) => {
  return (
  <>
    <p>{props.part.name} {props.part.exercises}</p>
  </>
  )
}

const Total = (props) => {
  return (
  <>
    <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
  </>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises}/>
    </div>
  )
}

export default App