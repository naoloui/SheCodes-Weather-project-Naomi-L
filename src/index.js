function displayTemperature(response) {
  let temperatureElement = document.querySelector(".temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");

  // Update temperature with unit and emoji
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}ºC ${getWeatherIcon(
    response.data.condition.description
  )}`;
  // Update weather description
  descriptionElement.innerHTML = response.data.condition.description;

  // Update humidity and wind speed
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  // Update time (local time for simplicity; consider timezone for accuracy)
  let now = new Date();
  timeElement.innerHTML = formatDate(now);
}

function displayForecast(response) {
  let forecastElement = document.querySelector(".weather-forecast");
  forecastElement.innerHTML = ""; // Clear existing forecast

  // Loop through daily forecast (SheCodes provides 5 days)
  response.data.daily.slice(0, 5).forEach((day, index) => {
    let date = new Date(day.time * 1000); // Convert timestamp to date
    forecastElement.innerHTML += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(date)}</div>
        <div class="weather-forecast-icon">
        ${getWeatherIcon(day.condition.description)}
        </div>
        <img src="${day.condition.icon_url}" />
        <div class="weather-forecast-temperatures"><strong>${Math.round(
          day.temperature.maximum
        )}ºC</strong></div>
        <div class="weather-forecast-temperature">${Math.round(
          day.temperature.minimum
        )}ºC</div>
      </div>
    `;
  });
}

function getWeatherIcon(description) {
  // Map weather conditions to emojis (customize as needed)
  description = description.toLowerCase();
  if (description.includes("clear") || description.includes("sunny"))
    return "☀️";
  if (description.includes("cloud")) return "🌥️";
  if (description.includes("rain") || description.includes("shower"))
    return "🌧️";
  if (description.includes("snow")) return "❄️";
  if (description.includes("storm") || description.includes("thunder"))
    return "⛈️";
  return "🌫️"; // Default for fog, mist, etc.
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}

function formatDay(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "3bb429560a4tfe3ecf96fae66oed5d7f"; // Move to environment variables in production
  let currentApiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  // Fetch current weather
  axios
    .get(currentApiUrl)
    .then(displayTemperature)
    .catch((error) => {
      alert("City not found. Please try again.");
      console.error(error);
    });

  // Fetch forecast
  axios
    .get(forecastApiUrl)
    .then(displayForecast)
    .catch((error) => {
      console.error("Forecast error:", error);
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  let city = searchInput.value.trim();

  if (city) {
    cityElement.innerHTML = city;
    searchCity(city);
  } else {
    alert("Please enter a city name.");
  }
}
searchCity("Madrid");

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
