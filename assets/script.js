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
    tempEl.textContent= `Temp: ${temp}°F`;
    windEl.textContent= `Wind: ${wind}mph`;
    humidityEl.textContent= `Humidity: ${humidity}%`;
    uvEl.textContent= `UV Index: ${uvIndex}`;
    body.append(header, tempEl, windEl, humidityEl, uvEl);
    today.innerHTML="";
    today.append(card);
    
};

function renderForecastCard(forecast){
    let temp= forecast.main.temp;
    let wind= forecast.wind.speed;
    let humidity= forecast.main.humidity;
    let iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
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
    tempEl.textContent= `Temp: ${temp}°F`;
    windEl.textContent= `Wind: ${wind}mph`;
    humidityEl.textContent= `Humidity: ${humidity}%`;
    forecast.append(col);
};

function renderForecast(dailyForecast){
    let start= moment().add(1, "days").calendar();
    let end = moment().add(6,"days").calendar();
    let headingCol = document.createElement("div");
    let heading = document.createElement("h4");
    headingCol.setAttribute("class", "col-12");
    heading.textContent= "Upcoming 5 Days:";
    headingCol.append(heading);
    forecast.innerHTML="";
    forecast.append(headingCol);

    for (let index = 0; index < dailyForecast.length; index++) {
        if (dailyForecast[i]>=start && dailyForecast[i]<end){
        renderForecastCard(dailyForecast[i]);
        }
    }
};




// append body to card
//set textContent to temp-${temp}
//click event listeners


//I need to display from API the city searched with city name, date, temp, wind, humidity and uv index

//I need to display the next 5 days with the date, icon, temp, wind and humidity


function cityDisplay(){
    fetch(``)
}



// <div class="col-lg-9 pb-3">
//           <section
//             id="today"
//             class="mt-3"
//             role="region"
//             aria-live="polite"
//           ></section>
//           <section
//             id="forecast"
//             class="row mt-3"
//             role="region"
//             aria-live="polite"
//           ></section>


// function renderItems(city, data) {
//     renderCurrentWeather(city, data.list[0], data.city.timezone);
//     renderForecast(data.list);
//   }
// function fetchWeather(location) {
//     var { lat } = location;
//     var { lon } = location;
//     var city = location.name;
  
//     var apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;
  
//     fetch(apiUrl)
//       .then(function (res) {
//         return res.json();
//       })
//       .then(function (data) {
//         renderItems(city, data);
//       })
//       .catch(function (err) {
//         console.error(err);
//       });
//   }
  
// function fetchCoords(search) {
//     var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
  
//     fetch(apiUrl)
//       .then(function (res) {
//         return res.json();
//       })
//       .then(function (data) {
//         if (!data[0]) {
//           alert('Location not found');
//         } else {
//           appendToHistory(search);
//           fetchWeather(data[0]);
//         }
//       })
//       .catch(function (err) {
//         console.error(err);
//       });
//   }

// function handleSearchFormSubmit(e) {
//     // Don't continue if there is nothing in the search form
//     if (!searchInput.value) {
//       return;
//     }
  
//     e.preventDefault();
//     var search = searchInput.value.trim();
//     fetchCoords(search);
//     searchInput.value = '';
//   }
  
//   function handleSearchHistoryClick(e) {
//     // Don't do search if current elements is not a search history button
//     if (!e.target.matches('.btn-history')) {
//       return;
//     }
  
//     var btn = e.target;
//     var search = btn.getAttribute('data-search');
//     fetchCoords(search);
//   }
  
//   initSearchHistory();
//   searchForm.addEventListener('submit', handleSearchFormSubmit);
//   searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);
  
  