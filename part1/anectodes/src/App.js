import React, { useState } from "react";

const Anectode = ({ label, anectodes, anectodeItem, points }) => (
  <>
    <h2>{label}</h2>
    <p>
      {anectodes[anectodeItem]}
      <br />
      has {points[anectodeItem]} points
    </p>
  </>
);

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients"
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [maxItem, setMaxItem] = useState(0);

  function randomSelect() {
    let num = Math.floor(Math.random() * anecdotes.length);
    setSelected(num);
  }

  function updatePoints() {
    let copy = [...points];
    copy[selected] += 1;
    let max = copy.indexOf(Math.max(...copy));
    if (Math.max(...copy) > Math.max(...points)) {
      setMaxItem(max);
    }
    setPoints(copy);
  }

  return (
    <div>
      <Anectode
        label="Anectode of the day"
        anectodes={anecdotes}
        anectodeItem={selected}
        points={points}
      />
      <Button label="vote" handleClick={updatePoints} />
      <Button label="next anectode" handleClick={randomSelect} />
      <Anectode
        label="Anectode with most votes"
        anectodes={anecdotes}
        anectodeItem={maxItem}
        points={points}
      />
    </div>
  );
};

export default App;
