const searchBtn = document.getElementById("search-city");
const WeatherApiKey = `0b6c4873ea51e81471ca3b4b3cc3cc35`;
let searchHistory=[];
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const today = document.querySelector("#today");
const forecastContainer = document.querySelector("#forecast");
const searchList= document.querySelector("#history");
const weatherApiRootUrl= "https://api.openweathermap.org";
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);


//this function displays the previously searched cities with the use of the search button
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
//this function is to display the past cities searched
function appendHistory(search){
    if (searchHistory.indexOf(search)!== -1) {
        return;
    } 
    searchHistory.push(search);
    localStorage.setItem("search-history", JSON.stringify(searchHistory));
    DisplayHistory();
    console.log(searchHistory)
}
// this function is to gather the past search history from local storage
function getHistory(){
    let storedHistory = localStorage.getItem("search-history");
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    DisplayHistory();
}
// this function allows the user to gather and view the current weather for that day by city searched
function renderCurrentWeather(city, weather){
    let date= moment().format("L");
    let temp= weather.main.temp;
    let wind= weather.wind.speed;
    let humidity= weather.main.humidity;
    let uvIndex= weather.main.uvi;
    let iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
    let card=document.createElement("div");
    let body=document.createElement("div");
    let header=document.createElement("h2");
    let icon=document.createElement("img");
    let tempEl=document.createElement("p");
    let windEl=document.createElement("p");
    let humidityEl=document.createElement("p");
    let uvEl=document.createElement("p");

    card.setAttribute("class", "card");
    body.setAttribute("class", "card-body");
    card.append(body);
    header.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");
    uvEl.setAttribute("class", "card-text");
    header.textContent= `${city} (${date})`;
    icon.setAttribute("src", iconUrl);
    icon.setAttribute("class", "weather-img");
    header.append(icon);
    tempEl.textContent= `Temp: ${temp}??F`;
    windEl.textContent= `Wind: ${wind}mph`;
    humidityEl.textContent= `Humidity: ${humidity}%`;
    uvEl.textContent= `UV Index: ${uvIndex}`;
    body.append(header, tempEl, windEl, humidityEl, uvEl);
    today.innerHTML="";
    today.append(card);
    
};
//this function is to set the cards for the following 5 day forecast
function renderForecastCard(forecast){
    let temp= forecast.main.temp;
    let wind= forecast.wind.speed;
    let humidity= forecast.main.humidity;
    let iconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    let col= document.createElement(`div`);
    let card=document.createElement("div");
    let body=document.createElement("div");
    let header=document.createElement("h2");
    let icon=document.createElement("img");
    let tempEl=document.createElement("p");
    let windEl=document.createElement("p");
    let humidityEl=document.createElement("p");

    col.append(card);
    card.append(body);
    body.append(header, icon, tempEl, windEl, humidityEl);
    col.setAttribute("class", "col-md");
    col.classList.add("five-day-card");
    card.setAttribute("class", "card bg-primary h-100 text-white");
    body.setAttribute("class", "card-body p-2");
    header.setAttribute("class", "card-title");
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");
    header.textContent=moment().format("L");
    icon.setAttribute("src", iconUrl);
    tempEl.textContent= `Temp: ${temp}??F`;
    windEl.textContent= `Wind: ${wind}mph`;
    humidityEl.textContent= `Humidity: ${humidity}%`;
    forecastContainer.append(col);
};
//this function pulls and displays the next 5 day forecast
function renderForecast(dailyForecast){
    let start = dayjs().add(1, "day").startOf("day").unix();
    let end = dayjs().add(6, "day").startOf("day").unix();
    console.log(start);
    console.log(end);
    let headingCol = document.createElement("div");
    let heading = document.createElement("h4");
    headingCol.setAttribute("class", "col-12");
    heading.textContent= "Upcoming 5 Days:";
    headingCol.append(heading);
    forecastContainer.innerHTML="";
    forecastContainer.append(headingCol);

    console.log(dailyForecast);

    for (let i = 0; i < dailyForecast.length; i++) {
        if (dailyForecast[i].dt>=start && dailyForecast[i].dt<end){
            if (dailyForecast[i].dt_txt.slice(11,13)=="12"){
                renderForecastCard(dailyForecast[i]);
                console.log(dailyForecast[i].dt)
            }
        
        }
    }
};

//this function renders the items of current weather and 5 day forecast
function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0], data.city.timezone);
    renderForecast(data.list);
}

// this fetches the weather based on lat and long then converts to city while fetching the api
function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
  
    var apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WeatherApiKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        renderItems(city, data);
      })
      .catch(function (err) {
        console.error(err);
      });
}

function fetchCoords(search) {
    var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${WeatherApiKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (!data[0]) {
          alert('Location not found');
        } else {
          appendHistory(search);
          fetchWeather(data[0]);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }


function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    if (!searchInput.value) {
      return;
    }
  
    e.preventDefault();
    var search = searchInput.value.trim();
    fetchCoords(search);
    searchInput.value = '';
  }
  
  function handleSearchHistoryClick(e) {
    // Don't do search if current elements is not a search history button
    if (!e.target.matches('.btn-history')) {
      return;
    }
  
    var btn = e.target;
    var search = btn.getAttribute('data-search');
    fetchCoords(search);
  }
  
  getHistory();
  searchForm.addEventListener('submit', handleSearchFormSubmit);
  searchList.addEventListener('click', handleSearchHistoryClick);
  
  


