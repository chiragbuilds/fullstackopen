const Header = ({ coursename }) => <h1>{coursename}</h1>;

const Content = ({ parts }) => (
  <div>
    {
    parts.map(p => (
      <Part key={p.id} part={p} />
    ))
    }
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  return (
    <p>
      <strong>total of {total} exerceses</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course