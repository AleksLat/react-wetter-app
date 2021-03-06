import React, { useState } from "react";

import WeatherInfo from "./WeatherInfo";
import axios from "axios";
import "./Weather.css";
import WeatherForecast from "./WeatherForecast";

export default function Weather(props){
    const [weatherData, setWeatherData] = useState({ready: false});
    const [city, setCity ] = useState(props.defaultCity);
    function handleResponse(response) {
console.log(response.data);
        setWeatherData({
            ready: true,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            city: response.data.name,
            date: new Date(response.data.dt * 1000),
            description: response.data.weather[0].description,
            icon:response.data.weather[0].icon,
            wind: response.data.wind.speed,
        })  
    }

function search(){
    const apiKey= "577759180b250273cb6dd606dacb4cd6";
    let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
}

function handleSubmit(event) {
    event.preventDefault();
    search (city);
}

function handleCityChange (event) {
setCity(event.target.value);
}

    if(weatherData.ready) {
        return(
            <div className="Weather">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                    <div className="col-9">
                    <input type="search" 
                    placeholder="Search for a city.."
                    className="form-control"
                    autoFocus="on"
                    onChange={handleCityChange}
                    />
                    </div>
                    <div className="col-3">
                    <input type="submit" value="Search" className="btn btn-primary w-100" />
                    </div>
                    </div>
                </form>
                <WeatherInfo data={weatherData}/>
                <WeatherForecast city={weatherData.city} />
    </div>
        )
    } else {
        search();
        return "Loading...";
    }
}