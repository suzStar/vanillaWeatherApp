function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col">
    <div class="col weekDays">${day}</div>
    <div class="col">
      <img
        src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
        alt="Current Weather"
      />
    </div>
    <div class="col">
      <span class="high">26°</span>
      <span class="low">26°</span>
    </div>
  </div>
  `;
  });

  forecastHTML = forecastHTML;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let timeDateElement = document.querySelector("#day-time");
  let descriptionElement = document.querySelector("#description");
  let weatherIcon = document.querySelector("#current-weather-icon");
  let iconImage = response.data.condition.icon_url;
  let iconImageAlt = response.data.condition.icon;
  let tempElement = document.querySelector("#current-temp");
  celsiusTemp = response.data.temperature.current;
  let humidityElement = document.querySelector("#humidity");
  humidity = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#wind");
  windSpeed = Math.round(response.data.wind.speed);
  // let precipitationElement = document.querySelector("#precipitation");
  // precipitation = Math.round(response.data.temperature);

  weatherIcon.setAttribute("src", iconImage, "alt", iconImageAlt);
  timeDateElement.innerHTML = formatDate(response.data.time * 1000);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${windSpeed} mph`;
  // precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;

  getForecast(response.data.coordinates);
}
function getForecast(coordinates) {
  const apiKey = "d04fb3e0250t4fa0be3579oeba197b2c";
  const apiURL = "https://api.shecodes.io/weather/v1/forecast?";
  let longitude = coordinates.longitude;
  let latitude = coordinates.latitude;

  let forecastURL = `${apiURL}lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(forecastURL).then(displayForecast);
}

function search(city) {
  const apiKey = "d04fb3e0250t4fa0be3579oeba197b2c";
  const apiURL = "https://api.shecodes.io/weather/v1/current?";
  let longitude = "";
  let latitude = "";

  let seachedCity = `${apiURL}query=${city}&key=${apiKey}&units=metric`;
  let geoLocation = `${apiURL}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(seachedCity).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
  // celsiusConversion.innerHTML = "°C";
  // fahrenheitConversion.innerHTML = "°F";
  celsiusConversion.classList.add("active");
  fahrenheitConversion.classList.remove("active");
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  // celsiusConversion.innerHTML = "°F";
  // fahrenheitConversion.innerHTML = "°C";
  celsiusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
}

let celsiusTemp = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

let celsiusConversion = document.querySelector("#celsius-link");
celsiusConversion.addEventListener("click", displayCelsius);

let fahrenheitConversion = document.querySelector("#fahrenheit-link");
fahrenheitConversion.addEventListener("click", displayFahrenheit);

search("London");
