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

  //   let formatedTime = date.toLocaleString("en-UK", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   });
  //return `${day} ${formatedTime}`;
  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  let weatherIcon = document.querySelector("#current-weather-icon");
  let iconImage = response.data.condition.icon_url;
  let iconImageAlt = response.data.condition.icon;
  weatherIcon.setAttribute("src", iconImage);
  weatherIcon.setAttribute("alt", iconImageAlt);

  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#current-temp");

  let descriptionElement = document.querySelector("#description");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;

  let precipitationElement = document.querySelector("#precipitation");
  let precipitation = Math.round(response.data.temperature);
  precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;

  let humidityElement = document.querySelector("#humidity");
  humidity = Math.round(response.data.temperature.humidity);
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind: ${windSpeed} mph`;

  let timeDateElement = document.querySelector("#day-time");
  timeDateElement.innerHTML = formatDate(response.data.time * 1000);
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
  console.log(cityInput.value);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);
search("London");
