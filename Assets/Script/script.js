let requestUrl =
  "http:api.openweathermap.org/data/2.5/weather?q=Detroit&appid=fcfa5b73754473131c3c62dd19bc9032";
let searchBtn = document.getElementById("searchBtn");
let cityInput = document.getElementById("cityInput");
let cityName = localStorage.getItem("cityName");
let cities = [];

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
    });
}

function getApi(city) {
  console.log(city);
  let requestUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=fcfa5b73754473131c3c62dd19bc9032";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("this the data from fetch", data);
      console.log(data.main.temp);
      console.log(data.main.humidity);
      console.log(data.wind.speed);
      let nameVal = data.name;
      let tempVal = data.main.temp;
      let humVal = data.main.humidity;
      let windVal = data.wind.speed;
      let uvVal = data.coord.lat;
      let uviVal = data.coord.lon;
      data.main.temp.innerHTML = "Tempature: " + tempVal + "&deg;";
      data.main.humidity.innerHTML = "Humidity: " + humVal;
      data.main.wind.innerHTML = "Wind Speed: " + windVal;
      data.main.uv.innerHTML = "UV Index: " + uvVal + uviVal;
      input.value = "";
      console.log(nameVal, tempVal, humVal, windVal, uvVal, uviVal);
    });
};
searchBtn.addEventListener("click", function () {
  console.log(cityInput.value);
  getApi(cityInput.value);
  //   localStorage.setItem("cityName", JSON.stringify(city));
  //   console.log(city);
});


