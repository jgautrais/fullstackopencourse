import React from "react";
import personService from "../services/persons";

const Input = ({ data, handleChange, value }) => (
  <div>
    {data}: <input value={value} onChange={handleChange} />
  </div>
);

const Button = ({ label }) => (
  <div>
    <button type="submit">{label}</button>
  </div>
);

const PersonsForm = ({
  persons,
  handleNameChange,
  name,
  handleNumberChange,
  number,
  setPersons,
  setNewName,
  setNewNumber,
  setMessage,
}) => {
  const addName = (event) => {
    event.preventDefault();
    if (
      persons.map((x) => x.name).includes(name) &&
      persons.map((x) => x.number).includes(number)
    ) {
      alert(`${name} is already added to the phonebook`);
      return;
    } else if (persons.map((x) => x.name).includes(name)) {
      const person = persons.filter((x) => x.name === name)[0];
      console.log(person.id);
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one ?`
        )
      ) {
        const id = person.id;
        const changedPerson = { ...person, number: number };
        personService
          .update(id, changedPerson)
          .then((response) => {
            setPersons(persons.map((x) => (x.id !== +id ? x : response.data)));
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            const message = {
              text: `Information of ${changedPerson.name} has already been removed from server`,
              type: "error",
            };
            setMessage(message);
            setTimeout(() => setMessage(null), 2000);
            personService.getAll().then((book) => setPersons(book));
            console.log(error);
          });
      }

      return;
    }

    const newPerson = {
      name: name,
      number: number,
    };

    personService.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      const message = {
        text: `Added ${response.data.name}`,
        type: "success",
      };
      setMessage(message);
      setTimeout(() => setMessage(null), 2000);
    });
  };

  return (
    <form onSubmit={addName}>
      <Input data="name" handleChange={handleNameChange} value={name} />
      <Input data="number" handleChange={handleNumberChange} value={number} />
      <Button label="add" />
    </form>
  );
};

export default PersonsForm;
