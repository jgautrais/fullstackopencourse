require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
const morgan = require("morgan");
const cors = require("cors");

app.set("json spaces", 2);
app.use(express.json());
app.use(cors());

morgan.token("body", function (req, res) {
  if (req.method === "POST" || req.method === "PUT") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (request, response) => {
  let date = new Date();
  Person.countDocuments().then((result) => {
    response.send(
      `<p>Phonebook has info for ${result} people</p><p>${date.toString()}</p>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.send(`<p>Resource not found</p>`);
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.deleteOne({ _id: id })
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons/", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;
  Person.updateOne(
    { _id: id },
    {
      $set: {
        number: body.number,
      },
    },
    { runValidators: true, context: "query" }
  )
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      return next(error);
    });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name) {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
