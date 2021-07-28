import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
  const personsToShow = persons.filter((x) =>
    x.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = (event) => {
    event.preventDefault();
    let id = event.target.id;
    let person = persons.filter((x) => x.id === +id)[0];
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(event.target.id).then((response) => {
        setPersons(persons.filter((x) => x.id !== +id));
      });
    }
  };

  return (
    <div>
      {personsToShow.map((x) => (
        <p key={x.id} style={{ margin: 0 }}>
          {x.name} {x.number}{" "}
          <button id={x.id} onClick={handleDelete}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
