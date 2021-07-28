const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.set("json spaces", 2);
app.use(express.json());

morgan.token("body", function (req, res) {
  if (req.method === "POST" || req.method === "PUT") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(cors());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  let date = new Date();
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p><p>${date.toString()}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const person = persons.find((x) => x.id === id);

  if (person) {
    response.json(person);
  } else {
    response.send(`<p>Resource not found</p>`);
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((x) => x.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return Math.round(Math.random() * 10000);
};

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(404).json({ error: "name property is missing" });
  } else if (!body.number) {
    return response.status(404).json({ error: "number property is missing" });
  } else if (
    persons.map((x) => x.name.toLowerCase()).includes(body.name.toLowerCase())
  ) {
    return response.status(404).json({
      error: `${body.name} is already included in the Phonebook, name must be unique`,
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;
  const person = persons.filter((x) => x.id === +body.id)[0];
  const newPerson = { ...person, number: body.number };
  persons.map((x) => (x.id !== +body.id ? x : newPerson));
  response.json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
