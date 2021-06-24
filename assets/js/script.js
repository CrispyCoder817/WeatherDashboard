var loactions = [];

var formforCity=document.querySelector("#city-search-form");
var inputCity=document.querySelector("#city");
var dashboardWeather=document.querySelector("#current-weather-container");
var inputCityRequest = document.querySelector("#searched-city");
var headerForecast = document.querySelector("#radar");
var containerForecast = document.querySelector("#fiveday-container");
var recentSearches = document.querySelector("#past-search-buttons");

var formSumbitHandler = function(event){
    event.preventDefault();
    var location = inputCity.value.trim();
    if(location){
        locationWeather(location);
        fiveDayRetrieve(location);
        loactions.unshift({location});
        inputCity.value = "";
    } else{
        alert("Please input a location");
    }
    storeSearch();
    pastSearch(location);
}

var storeSearch = function(){
    localStorage.setItem("loactions", JSON.stringify(loactions));
};

var locationWeather = function(city){
    var keyApi = "fcfa5b73754473131c3c62dd19bc9032"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${keyApi}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var displayWeather = function(weather, searchCity){
   //clear old content
   dashboardWeather.textContent= "";  
   inputCityRequest.textContent=searchCity;

   //create date element
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   inputCityRequest.appendChild(currentDate);

   //create an image element
   var iconReport = document.createElement("img")
   iconReport.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   inputCityRequest.appendChild(iconReport);

   //create a span element to hold temperature data
   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
  
   //create a span element to hold Humidity data
   var sweatPercentage = document.createElement("span");
   sweatPercentage.textContent = "Humidity: " + weather.main.humidity + " %";
   sweatPercentage.classList = "list-group-item"

   //create a span element to hold Wind data
   var gustSpeeds = document.createElement("span");
   gustSpeeds.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   gustSpeeds.classList = "list-group-item"

   //append to container
   dashboardWeather.appendChild(temperatureEl);

   //append to container
   dashboardWeather.appendChild(sweatPercentage);

   //append to container
   dashboardWeather.appendChild(gustSpeeds);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
}

var getUvIndex = function(lat,lon){
    var keyApi = "fcfa5b73754473131c3c62dd19bc9032"
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${keyApi}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvIndex(data)
           // console.log(data)
        });
    });
    //console.log(lat);
    //console.log(lon);
}
 
var displayUvIndex = function(index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "Groovin"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "Mediocre"
    }
    else if(index.value >8){
        uvIndexValue.classList = "Horrendous"
    };

    uvIndexEl.appendChild(uvIndexValue);

    //append index to current weather
    dashboardWeather.appendChild(uvIndexEl);
}

var fiveDayRetrieve = function(city){
    var keyApi = "fcfa5b73754473131c3c62dd19bc9032"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${keyApi}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           fiveDayDisplay(data);
        });
    });
};

var fiveDayDisplay = function(weather){
    containerForecast.textContent = ""
    headerForecast.textContent = "Five-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-dark m-2";

       //console.log(dailyForecast)

       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       
       //create an image icon
       var iconReport = document.createElement("img")
       iconReport.classList = "card-body text-center";
       iconReport.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast container
       forecastEl.appendChild(iconReport);
       
       //create temperature span so it displays
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast container
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast container
       forecastEl.appendChild(forecastHumEl);

        // console.log(forecastEl);
       //append to five day container
        containerForecast.appendChild(forecastEl);
    }

}

var pastSearch = function(pastSearch){
 
    // console.log(pastSearch)

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    recentSearches.prepend(pastSearchEl);
}


var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        locationWeather(city);
        fiveDayRetrieve(city);
    }
}

pastSearch();

formforCity.addEventListener("submit", formSumbitHandler);
recentSearches.addEventListener("click", pastSearchHandler);