let requestUrl =
  "http:api.openweathermap.org/data/2.5/weather?q=Detroit&appid=fcfa5b73754473131c3c62dd19bc9032";
let searchBtn = document.getElementById("searchBtn");
let cityInput = document.getElementById("cityInput");
let cityName = localStorage.getItem("cityName");
let cities = [];
let fiveDayElement = document.getElementsByClassName("fiveDayForecast");
console.log(fiveDayElement[0])
function getFiveDayForecast (userCity, lat, lon) {
  let test3 = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&appid=fcfa5b73754473131c3c62dd19bc9032"
let foreCast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + userCity + "&appid=fcfa5b73754473131c3c62dd19bc9032";
console.log("this is forecast", userCity)
fetch(test3)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log("this is our five day forecast", data.daily);
  let divEl = document.createElement("div");
  let dateEl = document.createElement("h1");
  let iconEl = document.createElement("img");
  let temp2 = document.createElement("p");
  let humids = document.createElement("p");
  dateEl.innerHTML = data.daily[0].dt
  iconEl.src="http://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png";
  temp2.innerHTML = data.daily[0].temp.day
  humids.innerHTML = data.daily[0].humidity
  divEl.appendChild(dateEl);
  divEl.appendChild(iconEl);
  divEl.appendChild(temp2);
  divEl.appendChild(humids);
  fiveDayElement[0].appendChild(divEl);
  // for loop for 5 day date icon temp humidity
})
}
// "http://openweathermap.org/img/w/" + data.daily[0].weather.icon + ".png"
function getuvIndex(lat, lon) {
  let requestUrl2 =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=fcfa5b73754473131c3c62dd19bc9032";
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("this is the uv index fetch", data.value);
      document.getElementById("uv-index").innerHTML = "UV Index:" + data.value;
      if (data.value <= 2 && data.value > 0) {
        document.getElementById("uv-index").style.backgroundColor = "green"
      } 
      else if (data.value <= 3 && data.value > 5) {
        document.getElementById("uv-index").style.backgroundColor = "yellow"
      }
      else if (data.value <= 6 && data.value > 7) {
        document.getElementById("uv-index").style.backgroundColor = "orange"
      }
      else {
        document.getElementById("uv-index").style.backgroundColor = "red"
      }
    });
}

function getApi(userCity) {
  console.log(userCity);
  const cityWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=fcfa5b73754473131c3c62dd19bc9032";
  fetch(cityWeatherUrl, {
    method: "GET",
    withCredentials: true,
  })
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      // how to unix to string
      const nameVal = data["name"];
      const tempVal = data["main"]["temp"];
      const humVal = data["main"]["humidity"];
      const windVal = data["wind"]["speed"];
      const uvVal = data["coord"]["lat"];
      const uviVal = data["coord"]["lon"];
      document.getElementById("name").innerHTML = "Name: " + nameVal;
      console.log("nameVal");
      document.getElementById("temp").innerHTML = "Tempature: " + tempVal;
      document.getElementById("humidity").innerHTML = "Humidity: " + humVal;
      document.getElementById("wind-speed").innerHTML = "Wind Speed: " + windVal;
      getuvIndex(uvVal, uviVal);
      getFiveDayForecast(userCity, uvVal, uviVal);

      // document.getElementById("uv-index").innerHTML =
      //   "UV Index: " + uvVal + " " + uviVal;

      console.log(nameVal, tempVal, humVal, windVal, uvVal, uviVal);
    });
};
searchBtn.addEventListener("click", function () {
  console.log(cityInput.value);
  getApi(cityInput.value);
    localStorage.setItem("cityName", cityInput.value);

});
// save to list in array then stringify how to add it on the page as recent search section
// save to local storage if theres something in local storage load into section
// persists the recent search
// how to convert unix time to regular