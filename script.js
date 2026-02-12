
//making object of weatherapi
const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
}

//anonymous function
//adding event listener key press of enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }
})


//get waether report

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)  // fetch method fetching the data from  base url ...metric is used for unit in celcius......here i am appending the base url to get data by city name .  
        .then(weather => {   //weather is from api
            return weather.json(); // return data from api in JSON
        }).then(showWeaterReport);  // calling showweatherreport function

}

//show weather report

function showWeaterReport(weather) {
    let city_code=weather.cod;
    if(city_code==400){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    }else if(city_code==404){
        swal("Bad Input", "entered city didn't matched", "warning");
        reset();
    }
    else{
        let suggestion = getClothingAndTravel(
    weather.main.temp,
    weather.weather[0].main
    );


    // console.log(weather.cod);
    // console.log(weather);  
    let op = document.getElementById('weather-body');
    op.style.display = 'block';
    let todayDate = new Date();
    let parent=document.getElementById('parent');
    let weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.main.temp)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
    <div class="basic">
        Feels like ${weather.main.feels_like}&deg;C |
        Humidity ${weather.main.humidity}% <br>
        Pressure ${weather.main.pressure} mb |
        Wind ${weather.wind.speed} KMPH
    </div>

    <div class="suggestions">
        <div class="clothing">
            👗 <b>Clothing:</b> ${suggestion.clothing}
        </div>
        <div class="travel">
            ✈️ <b>Travel Guide:</b> ${suggestion.travel}
        </div>
    </div>
</div>



    `;
    parent.append(weather_body);
    changeBg(weather.weather[0].main);
    reset();
    }
}



//making a function for the  last update current time 

function getTime(todayDate) {
    let hour =addZero(todayDate.getHours());
    let minute =addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

//date manage for return  current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    // console.log(year+" "+date+" "+day+" "+month);
    return `${date} ${month} (${day}) , ${year}`
}

// function for the dynamic background change  according to weather status
function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(img/clouds.jpg)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(img/rainy.jpg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(img/clear.jpg)';
    }
    else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(img/snow.jpg)';
    }
    else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(img/sunny.jpg)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(img/drizzle.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(img/mist.jpg)';
    }

    else {
        document.body.style.backgroundImage = 'url(img/bg.jpg)';
    }
}

//making a function for the classname of icon
function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}
// clothing + travel guide suggestion
function getClothingAndTravel(temp, weather) {

    weather = weather.toLowerCase();

    let clothing = "";
    let travel = "";

    // Rain
    if (weather.includes("rain")) {
        clothing = "🌧️ Wear a raincoat and waterproof shoes";
        travel = "🚗 Travel with caution. Carry an umbrella. Roads may be slippery.";
    }
    // Snow
    else if (weather.includes("snow")) {
        clothing = "❄️ Wear heavy jackets, gloves and boots";
        travel = "⚠️ Avoid long travel. Roads may be blocked due to snow.";
    }
    // Thunderstorm
    else if (weather.includes("thunderstorm")) {
        clothing = "⛈️ Stay indoors if possible";
        travel = "🚫 Not safe for travel. Flights and road travel may get delayed.";
    }
    // Hot weather
    else if (temp > 30) {
        clothing = "☀️ Wear light cotton clothes and sunglasses";
        travel = "🧴 Safe to travel. Carry water and avoid afternoon sun.";
    }
    // Pleasant weather
    else if (temp >= 20 && temp <= 30) {
        clothing = "👕 T-shirt and jeans are comfortable";
        travel = "✈️ Ideal weather for travelling and sightseeing.";
    }
    // Cold weather
    else if (temp >= 10 && temp < 20) {
        clothing = "🧥 Wear a light jacket or hoodie";
        travel = "🚶 Good for short trips. Carry warm clothes.";
    }
    // Very cold
    else {
        clothing = "🥶 Wear sweaters, jackets and warm clothes";
        travel = "⚠️ Travel only if necessary. Cold conditions expected.";
    }

    return { clothing, travel };
}



function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// funtion to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
