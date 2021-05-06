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

  export default Course