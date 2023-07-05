import { useState, useEffect } from 'react';
import '../App.css';

import countries from 'i18n-iso-countries';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function Weather() {
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('swiss');
  const [state, setState] = useState('swiss');

  //const lon = apiData.coord?.lon;
  //const lat = apiData.coord?.lat;

  const Raw_API_KEY = process.env.REACT_APP_API_KEY;
  //removes the quotes from the api key
  const API_KEY = Raw_API_KEY.replace(/['"]+/g, '');

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${API_KEY}`; 

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((error) => console.log(error));
  }, [apiUrl]);

  //let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}.34&lon=${lon}&appid=${API_KEY}`;
  /*
  async function getForecast() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${API_KEY}`;

    const response = await fetch(apiForecast);
    const Dailydata = await response.json();

    let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}.34&lon=${lon}&appid=${API_KEY}`;
    const response2 = await fetch(apiForecast);
    const Hourlydata = await response2.json();
  }
  */
  //functions 
  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToCelcius = (k) => {
    return (k - 273.15).toFixed(2);
  };

  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div class="col-auto">
            <label for="location-name" class="col-form-label">
              Enter Location :
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>        
          <button className="bn" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
          {apiData.main ? (
            <div class="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2">
                temperature: {kelvinToCelcius(apiData.main.temp)}&deg; C
              </p>
            
              <p className="h5">
                <i className="fas fa-map-marker-alt"></i>{' '}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6">
                  <p>
                    <i class="fas fa-temperature-low "></i>{' '}
                    <strong>
                      Lowest temperature: {kelvinToCelcius(apiData.main.temp_min)}&deg; C
                    </strong>
                  </p>
                  <p>
                    <i className="fas fa-temperature-high"></i>{' '}
                    <strong>
                      Highest temperature: {kelvinToCelcius(apiData.main.temp_max)}&deg; C
                    </strong>
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    {' '}
                    <strong>Condition: {apiData.weather[0].main}</strong>
                  </p>
                  <p>
                    <strong>
                      {' '}
                      {countries.getName(apiData.sys.country, 'en', {
                        select: 'official',
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            //https://uiverse.io/zanina-yassine/weak-bobcat-68
          /*
            <div class="container">
              <div class="cloud front">
                <span class="left-front"></span>
                <span class="right-front"></span>
              </div>
              <span class="sun sunshine"></span>
              <span class="sun"></span>
              <div class="cloud back">
                <span class="left-back"></span>
                <span class="right-back"></span>
              </div>
            </div>
            */
           <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;