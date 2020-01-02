const  iconElement = document.querySelector(".weather-icon");
const  tempElement = document.querySelector(".temperature-value");
const  descElement = document.querySelector(".temperature-description");
const  locationElement = document.querySelector(".location");
const  notificationElement = document.querySelector(".notification");

const weather = {};

weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;

//API KEY
// 82005d27a116c2880c8f0fcb866998a0
const key = "ec8fc80768270f5e7894c106f81ac4b8";

// Geolocation Support
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

// User position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// get weather from api
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(api);
    

    // const promise = fetch(api) .then( function(response){
    //     let data = response.json();
    //     return data;
    // })
    // promise.then(function(data){
    //     weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    //     weather.description = data.weather[0].description;
    //     weather.iconId = data.weather[0].icon;
    //     weather.city = data.name;
    //     weather.country = data.sys.country;
    // })
    // .then( function(){
    //     displayWeather();
    // });


}


