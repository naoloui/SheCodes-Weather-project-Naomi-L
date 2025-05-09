function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "3bb429560a4tfe3ecf96fae66oed5d7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
  console.log(apiUrl);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let = searchInput = document.querySelector("#search-form-input");
  let = cityElement = document.querySelector("#city");

  searchCity(searchInput.value);
  console.log(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
