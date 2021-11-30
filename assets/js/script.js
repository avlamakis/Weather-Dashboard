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

