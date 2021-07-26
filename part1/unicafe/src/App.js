import React, { useState } from "react";

const Header = () => {
  return <h1>Give feedback</h1>;
};

const Button = ({ label, modifier }) => (
  <button onClick={modifier}>{label}</button>
);

const Feedback = ({ modifiers }) => {
  return (
    <>
      <Button label="good" modifier={modifiers[0]} />
      <Button label="neutral" modifier={modifiers[1]} />
      <Button label="bad" modifier={modifiers[2]} />
    </>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ counts }) => {
  const all = counts[0] + counts[1] + counts[2];
  const average = (counts[0] - counts[2]) / all;
  const positive = `${(counts[0] / all) * 100} %`;
  if (all === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value={counts[0]} />
            <Statistic text="neutral" value={counts[1]} />
            <Statistic text="bad" value={counts[2]} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={average} />
            <Statistic text="positive" value={positive} />
          </tbody>
        </table>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => setGood(good + 1);
  const handleClickNeutral = () => setNeutral(neutral + 1);
  const handleClickBad = () => setBad(bad + 1);

  const modifiers = [handleClickGood, handleClickNeutral, handleClickBad];
  const clickCounts = [good, neutral, bad];

  return (
    <div>
      <Header />
      <Feedback modifiers={modifiers} />
      <Statistics counts={clickCounts} />
    </div>
  );
};

export default App;
