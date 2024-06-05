// weather.js

let dataEl = JSON.parse(localStorage.getItem("data"));
let idEl = JSON.parse(localStorage.getItem("id"));

const weatherEl = document.getElementById("weather");

let selectedLocation = dataEl.results[idEl];

let lat = selectedLocation.lat;
let lon = selectedLocation.lon;

const yrUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

fetch(yrUrl, {
    method: 'GET',
    headers: {
        'User-Agent': 'Skjellum Yr/1.0 (alsta017@gmail.com)'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data);
    for (let i = 0; i < data.properties.timeseries.length; i++) {
        let time = "Time: " + new Date(data.properties.timeseries[i].time).toLocaleTimeString('nb-NO', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'});
        let temperature = "Temperature: " + data.properties.timeseries[i].data.instant.details.air_temperature + " °C";
        let windSpeed = "Wind speed: " + data.properties.timeseries[i].data.instant.details.wind_speed + " m/s";
        let windDirection = "Wind direction: " + data.properties.timeseries[i].data.instant.details.wind_from_direction + "°";
        let rain;
        let weather;
        if (data.properties.timeseries[i].data.next_1_hours) {
            weather = data.properties.timeseries[i].data.next_1_hours.summary.symbol_code;
            rain = "Rain: " + data.properties.timeseries[i].data.next_1_hours.details.precipitation_amount + " mm";
        } else if (data.properties.timeseries[i].data.next_6_hours) {
            weather = data.properties.timeseries[i].data.next_6_hours.summary.symbol_code;
            rain = "Rain: " + data.properties.timeseries[i].data.next_6_hours.details.precipitation_amount + " mm";
        } else if (data.properties.timeseries[i].data.next_12_hours) {
            weather = data.properties.timeseries[i].data.next_12_hours.summary.symbol_code;
            rain = "Rain: " + data.properties.timeseries[i].data.next_12_hours.details.precipitation_amount + " mm";
        }
        let weatherDiv = document.createElement("div");
        weatherDiv.className = "weather";
        let timeText = document.createElement("p");
        timeText.className = "time";
        timeText.textContent = time;
        let temperatureText = document.createElement("p");
        temperatureText.className = "temperature";
        temperatureText.textContent = temperature;
        let windSpeedText = document.createElement("p");
        windSpeedText.className = "windSpeed";
        windSpeedText.textContent = windSpeed;
        let windDirectionText = document.createElement("p");
        windDirectionText.className = "windDirection";
        windDirectionText.textContent = windDirection;
        let rainDiv = document.createElement("p");
        rainDiv.className = "rain";
        rainDiv.textContent = rain;
        let weatherSymbol = document.createElement("img");
        weatherSymbol.className = "weatherSymbol";
        if (weather === "clearsky_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/01d.svg";
        } else if (weather === "clearsky_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/01n.svg";
        } else if (weather === "clearsky_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/01m.svg";
        } else if (weather === "fair_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/02d.svg";
        } else if (weather === "fair_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/02n.svg";
        } else if (weather === "fair_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/02m.svg";
        } else if (weather === "partlycloudy_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/03d.svg";
        } else if (weather === "partlycloudy_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/03n.svg";
        } else if (weather === "partlycloudy_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/03m.svg";
        } else if (weather === "cloudy") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/04.svg";
        } else if (weather === "rainshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/05d.svg";
        } else if (weather === "rainshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/05n.svg";
        } else if (weather === "rainshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/05m.svg";
        } else if (weather === "rainshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/06d.svg";
        } else if (weather === "rainshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/06n.svg";
        } else if (weather === "rainshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/06m.svg";
        } else if (weather === "sleetshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/07d.svg";
        } else if (weather === "sleetshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/07n.svg";
        } else if (weather === "sleetshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/07m.svg";
        } else if (weather === "snowshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/08d.svg";
        } else if (weather === "snowshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/08n.svg";
        } else if (weather === "snowshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/08m.svg";
        } else if (weather === "rain") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/09.svg";
        } else if (weather === "heavyrain") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/10.svg";
        } else if (weather === "heavyrainandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/11.svg";
        } else if (weather === "sleet") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/12.svg";
        } else if (weather === "snow") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/13.svg";
        } else if (weather === "snowandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/14.svg";
        } else if (weather === "fog") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/15.svg";
        } else if (weather === "sleetshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/20d.svg";
        } else if (weather === "sleetshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/20n.svg";
        } else if (weather === "sleetshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/20m.svg";
        } else if (weather === "snowshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/21d.svg";
        } else if (weather === "snowshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/21n.svg";
        } else if (weather === "snowshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/21m.svg";
        } else if (weather === "rainandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/22.svg";
        } else if (weather === "sleetandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/23.svg";
        } else if (weather === "lightrainshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/24d.svg";
        } else if (weather === "lightrainshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/24n.svg";
        } else if (weather === "lightrainshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/24m.svg";
        } else if (weather === "heavyrainshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/25d.svg";
        } else if (weather === "heavyrainshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/25n.svg";
        } else if (weather === "heavyrainshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/25m.svg";
        } else if (weather === "lightssleetshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/26d.svg";
        } else if (weather === "lightssleetshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/26n.svg";
        } else if (weather === "lightssleetshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/26m.svg";
        } else if (weather === "heavysleetshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/27d.svg";
        } else if (weather === "heavysleetshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/27n.svg";
        } else if (weather === "heavysleetshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/27m.svg";
        } else if (weather === "lightssnowshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/28d.svg";
        } else if (weather === "lightssnowshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/28n.svg";
        } else if (weather === "lightssnowshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/28m.svg";
        } else if (weather === "heavysnowshowersandthunder_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/29d.svg";
        } else if (weather === "heavysnowshowersandthunder_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/29n.svg";
        } else if (weather === "heavysnowshowersandthunder_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/29m.svg";
        } else if (weather === "lightrainandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/30.svg";
        } else if (weather === "lightsleetandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/31.svg";
        } else if (weather === "heavysleetandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/32.svg";
        } else if (weather === "lightsnowandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/33.svg";
        } else if (weather === "heavysnowandthunder") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/34.svg";
        } else if (weather === "lightrainshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/40d.svg";
        } else if (weather === "lightrainshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/40n.svg";
        } else if (weather === "lightrainshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/40m.svg";
        } else if (weather === "heavyrainshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/41d.svg";
        } else if (weather === "heavyrainshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/41n.svg";
        } else if (weather === "heavyrainshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/41m.svg";
        } else if (weather === "lightsleetshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/42d.svg";
        } else if (weather === "lightsleetshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/42n.svg";
        } else if (weather === "lightsleetshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/42m.svg";
        } else if (weather === "heavysleetshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/43d.svg";
        } else if (weather === "heavysleetshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/43n.svg";
        } else if (weather === "heavysleetshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/43m.svg";
        } else if (weather === "lightsnowshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/44d.svg";
        } else if (weather === "lightsnowshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/44n.svg";
        } else if (weather === "lightsnowshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/44m.svg";
        } else if (weather === "heavysnowshowers_day") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/45d.svg";
        } else if (weather === "heavysnowshowers_night") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/45n.svg";
        } else if (weather === "heavysnowshowers_polartwilight") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/45m.svg";
        } else if (weather === "lightrain") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/46.svg";
        } else if (weather === "lightsleet") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/47.svg";
        } else if (weather === "heavysleet") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/48.svg";
        } else if (weather === "lightsnow") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/49.svg";
        } else if (weather === "heavysnow") {
            weatherSymbol.src = "https://nrkno.github.io/yr-weather-symbols/symbols/darkmode/50.svg";
        } else {
            weatherSymbol.textContent = "Icon not found";
        };
        weatherDiv.appendChild(timeText);
        weatherDiv.appendChild(temperatureText);
        weatherDiv.appendChild(windSpeedText);
        weatherDiv.appendChild(windDirectionText);
        weatherDiv.appendChild(weatherSymbol);
        weatherDiv.appendChild(rainDiv);
        weatherEl.appendChild(weatherDiv);
    }
})
.catch(err => {
    console.error('Error fetching data:', err);
    // Handle error
});