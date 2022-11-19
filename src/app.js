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
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];

  let backgroundElement = document.querySelector("#background-Image");
  let colorElement = document.querySelector("#timeStyle");
  let humidityIconElement = document.querySelector("#humidityIcon");
  let windIconElement = document.querySelector("#windIcon");

  let morningImage =
    "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/503/original/Morning.png?1668785232)";
  let afternoonImage =
    "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/501/original/Afternoon.png?1668785221)";
  let eveningImage =
    "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/502/original/Evening.png?1668785227)";
  let nightImage =
    "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/504/original/Night.png?1668785242)";

  let windBlackIcon =
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/612/original/windBlack.png?1668858083";
  let windWhiteIcon =
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/613/original/windWhite.png?1668858091";
  let humidityBlackIcon =
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/610/original/humidityBlack.png?1668858070";
  let humidityWhiteIcon =
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/054/611/original/humidityWhite.png?1668858075";

  if (hours < 12) {
    backgroundElement.style.backgroundImage = morningImage;
    colorElement.style.color = "#242424";
    humidityIconElement.setAttribute("src", humidityBlackIcon);
    windIconElement.setAttribute("src", windBlackIcon);
  } else if (hours < 18) {
    backgroundElement.style.backgroundImage = afternoonImage;
    colorElement.style.color = "#242424";
    humidityIconElement.setAttribute("src", humidityBlackIcon);
    windIconElement.setAttribute("src", windBlackIcon);
  } else if (hours < 22) {
    backgroundElement.style.backgroundImage = eveningImage;
    colorElement.style.color = "#242424";
    humidityIconElement.setAttribute("src", humidityBlackIcon);
    windIconElement.setAttribute("src", windBlackIcon);
  } else if (hours < 00) {
    backgroundElement.style.backgroundImage = nightImage;
    colorElement.style.color = "#ffffff";
    humidityIconElement.setAttribute("src", humidityWhiteIcon);
    windIconElement.setAttribute("src", windWhiteIcon);
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return daysOfWeek[day];
}

function displayForecast(response) {
  let dailyForcast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  dailyForcast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
    <div class="col weekDays">${formatDay(forecastDay.time)}</div>
    <div class="col">
      <img
        src="${forecastDay.condition.icon_url}"
        alt="${forecastDay.condition.icon}"
        width="60"
      />
    </div>
    <div class="col">
      <span class="high">${Math.round(forecastDay.temperature.maximum)}°</span>
      <span class="low">${Math.round(forecastDay.temperature.minimum)}°</span>
    </div>
  </div>
    `;
    }
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

  weatherIcon.setAttribute("src", iconImage, "alt", iconImageAlt);
  timeDateElement.innerHTML = formatDate(response.data.time * 1000);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  tempElement.innerHTML = Math.round(celsiusTemp);
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} mph`;

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
  let seachedCity = `${apiURL}query=${city}&key=${apiKey}&units=metric`;
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
}

let celsiusTemp = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

search("London");
