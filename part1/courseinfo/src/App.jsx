
const Header = (props) => {
  
  return(
    <h1>{props.course}</h1>
  )
}


const Content = ({ part }) => {
  return(
    part.map((element) => (
      <Part key={element.name} name={element.name} exercises={element.exercises}/>
    ))
  )
}

const Part = (props) => {
  
  return(
    <p>{props.name} {props.exercises}</p>
  )
}
const Total = ({ total }) => {
  let sum = 0;
  total.forEach(element => {
    sum = sum + element.exercises;
  });

  return(
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App