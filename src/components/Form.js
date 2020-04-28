import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Form = ({ search, setSearch, setCanConsult }) => {
  //state for error

  const [error, setError] = useState(false);

  // destructu of search state
  const { city, country } = search;

  // function to update state according to inputs
  const handleChange = (e) => {
    //update state
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  //function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //validar
    if (city.trim() === "" || country.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    //pass to main component
    setCanConsult(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error message={"All fields must filled"} /> : null}
      <div className="input-field  col s12">
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={handleChange}
        />
        <label htmlFor="city">City: </label>
      </div>
      <div className="input-field col s12">
        <select
          name="country"
          id="country"
          value={country}
          onChange={handleChange}
        >
          <option value="">-- Select a country --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">Mexico</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">Spain</option>
          <option value="PE">Peru</option>
        </select>
        <label htmlFor="country">Country:</label>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        >
          Search Weather
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  search: PropTypes.object.isRequired,
  setSearch: PropTypes.func.isRequired,
  setCanConsult: PropTypes.func.isRequired,
};

export default Form;
