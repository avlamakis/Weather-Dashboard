//global variables set called by ID

var cities = [];

var cityInputEl=document.querySelector("#city");

var citySearchInputEl = document.querySelector("#searched-city");
var weatherContainerEl=document.querySelector("#current-weather");

var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");

var pastSearchButtonEl = document.querySelector("#past-search-btns");

// Variable targeting the event
var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    //if statement calling the functions
    if(city){
        getCityWeather(city);
        getForecast(city);
        cityInputEl.value = "";
    } else{
        alert("Please enter a valid City");
    }
    // call of search history along with saving prior searches
    saveSearch();
    searchHistory(city);
}
//local storage with stringify using JSON
var saveSearch = function(){
    localStorage.setItem("Cities", JSON.stringify(cities));
};

// fetch for server side API within function
var getCityWeather = function(city){
    //api key gathered from https://home.openweathermap.org/api_keys
    var apiKey = "53cc19866aee7a5602f390746fd6f2e7"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    //fetch for api URL
    fetch(apiURL)
    .then(function(response){
        //display for data with call of displayweather
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

// display variable for weather and each div element within
var displayWeather = function(weather, searchedCity){
    //clear old content from remaining on page 
    weatherContainerEl.textContent= "";  
    citySearchInputEl.textContent=searchedCity;
 
    //created date element, utilizing moment.js file to create the date format reference https://momentjs.com/ to set todays date
    var todaysDate = moment().format('MMMM Do YYYY');
    $(".todaysDate").append(today);
    console.log(todaysDate)
 
    //created a image element for weather ICONS
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearchInputEl.appendChild(weatherIcon);
 
    //created a div element to hold the temperature data
    var temperatureEl = document.createElement("div");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °f";
    temperatureEl.classList = "list-group-item"
   
    //created a div element to hold the humidity data
    var humidityEl = document.createElement("div");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"
 
    //created a div element to hold the wind data
    var windSpeedEl = document.createElement("div");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"
 
    //appending each div element to the main container
    weatherContainerEl.appendChild(temperatureEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windSpeedEl);
 
    //referenced https://openweathermap.org/api/one-call-api to help with setting lat and lon
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    //call for UV Index variable
    getUvIndex(lat,lon)
}

//variable function for UV index to fet data for lat,lon
var getUvIndex = function (lat,lon) {
    var apiURL = 'https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}'
    //fetch for the open weather map API with lat and lon parameters
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayUvindex(data);
        });
    });
    console.log(lon);
    console.log(lat);
}

// display of the UV index
var displayUvindex = function(index) {
    var uvIndexEl = document.createElement ("div")
    uvIndexEl.textContent = "UV INDEX"
    uvIndexEl.classList ="list-group"

    //span element for UV Value
    uvIndexValue = document.createElement("span")
    uvIndexEl.textContent = index.value

    // if and else if statements for value on index for weather conditions, numeric amount taken from Open Weather API
    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };
    //append index value to index element
    uvIndexEl.appendChild(uvIndexValue);
    //append index element to current weather element
    weatherContainerEl.appendChild(uvIndexEl);
};
