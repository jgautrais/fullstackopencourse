import React from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercisesNumber}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} exercisesNumber={props.exercisesNumbers[0]} />
      <Part part={props.parts[1]} exercisesNumber={props.exercisesNumbers[1]} />
      <Part part={props.parts[2]} exercisesNumber={props.exercisesNumbers[2]} />
    </div>
  );
};

const Footer = (props) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercisesNumbers={[exercises1, exercises2, exercises3]}
      />
      <Footer totalExercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
