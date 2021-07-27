import React, { useState, useEffect } from "react";

import axios from "axios";

const Input = ({ value, handleChange }) => (
  <input type="text" onChange={handleChange} value={value} />
);

const Search = ({ inputValue, handleChange }) => (
  <div>
    find countries&nbsp;
    <Input value={inputValue} handleChange={handleChange} />
  </div>
);

const Weather = ({ capital, weather }) => {
  return (
    <>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.temperature} Celsius</p>
      <img src={weather.weather_icons[0]} alt={weather.weather_descriptions} />
      <p>
        wind: {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </>
  );
};

const Country = ({ weatherApi, country }) => {
  const [weather, setWeather] = useState([]);

  let rem = 16;

  useEffect(() => {
    axios
      .get(
        `https://api.weatherstack.com/current?access_key=${weatherApi}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  }, [country]);

  console.log(weather);

  return (
    <>
      <h2>{country.name}</h2>
      <p style={{ margin: 0 }}>capital: {country.capital}</p>
      <p style={{ margin: 0 }}>population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((x) => (
          <li key={x.iso639_1}>{x.name}</li>
        ))}
      </ul>
      <img
        style={{ maxWidth: 8 * rem }}
        src={country.flag}
        alt={country.name + " flag"}
      />
      {Object.keys(weather).length !== 0 && (
        <Weather capital={country.capital} weather={weather} />
      )}
    </>
  );
};

const Button = ({ handleClick, label, value }) => (
  <button onClick={handleClick} value={value}>
    {label}
  </button>
);

const Response = ({ countries, handleClick, weatherApi }) => {
  if (countries.length === 0) {
    return <div></div>;
  } else if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} weatherApi={weatherApi} />
      </div>
    );
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((x) => (
          <p style={{ margin: 0 }} key={x.numericCode}>
            {x.name}
            <Button label="show" handleClick={handleClick} value={x.name} />
          </p>
        ))}
      </div>
    );
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const weather_api_key = process.env.REACT_APP_API_WEATHER_KEY;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = (event) => {
    setFilter(event.target.value);
  };

  const countriesToShow =
    filter === ""
      ? []
      : countries.filter((x) =>
          x.name.toLowerCase().includes(filter.toLowerCase())
        );

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <Search inputValue={filter} handleChange={handleFilterChange} />
      <Response
        countries={countriesToShow}
        handleClick={handleClick}
        weatherApi={weather_api_key}
      />
    </div>
  );
};

export default App;
