import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from "./components/Error";

function App() {
  //main state
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });

  const [canConsult, setCanConsult] = useState(false);

  const [result, setResult] = useState({});
  const [error, setError] = useState(false);

  //deconstruct state
  const { city, country } = search;

  useEffect(() => {
    const consultAPI = async () => {
      if (canConsult === true) {
        const apiKey = `29ab27d2c70a89099637171161cbe6d4`;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

        const apiResponse = await fetch(url);
        const apiResult = await apiResponse.json();
        setResult(apiResult);
        if (apiResult.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
    };

    consultAPI();
    setCanConsult(false);
    // eslint-disable-next-line
  }, [canConsult]);

  return (
    <Fragment>
      <Header title={"Weather React App"} />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                setSearch={setSearch}
                setCanConsult={setCanConsult}
              ></Form>
            </div>
            <div className="col m6 s12">
              {error ? (
                <Error message={"The city could't be found"} />
              ) : (
                <Weather result={result} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
