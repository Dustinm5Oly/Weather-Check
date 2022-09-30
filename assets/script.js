const searchBtn = document.getElementById("search-city");
const WeatherApiKey = `0b6c4873ea51e81471ca3b4b3cc3cc35`;
const CityName = document.getElementById("selectedCity");
const searchHistory=[];
const searchForm = document.querySelector("#searchForm")
const searchInput = document.querySelector("#input-group")
const today = document.querySelector("#selectedCity")
const forecast = document.querySelector("#nextFiveDays")
const searchList= document.querySelector("#previouslySearched")

//I need to display user input to display city in previously searched
function DisplayHistory(){
    searchList.innerHTML="";
    for (let index = searchHistory.length-1; index >= 0; index--) { // this takes from the end of the array to the begining.
        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList.add("history-btn", "btn-history");
        btn.setAttribute("data-search", searchHistory[index]);
        btn.textContent=searchHistory[index];
        searchList.append(btn);
    }
}

function appendHistory(search){
    if (searchHistory.indexOf(search)!== -1) {
        return;
    } 
    searchHistory.push(search);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    DisplayHistory();
    console.log(searchHistory)
}

function getHistory(){
    let storedHistory = localStorage.getItem("search-history");
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    DisplayHistory();
}

function renderCurrentWeather(city, weather){
    let date= moment().format("L");
    let temp= weather.main.temp;
    let wind= weather.wind.speed;
    let humidity= weather.main.humidity;
    let uvIndex= weather.main.uvi
    let iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
    let card=document.createElement("div");
    let body=document.createElement("div");
    let header=document.createElement("h2");
    let icon=document.createElement("img");
    let tempEl=document.createElement("p");
    let windEl=document.createElement("p");
    let humidityEl=document.createElement("p");
    let uvEl=document.createElement("p");
//variable.setAttr (classes)
//append info to card body
// append body to card
//set textContent to temp-${temp}
//click event listeners
}
//I need to display from API the city searched with city name, date, temp, wind, humidity and uv index

//I need to display the next 5 days with the date, icon, temp, wind and humidity


function cityDisplay(){
    fetch(``)
}