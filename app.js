const  iconElement = document.querySelector(".weather-icon");
const  tempElement = document.querySelector(".temperature-value");
const  descElement = document.querySelector(".temperature-description p");
const  locationElement = document.querySelector(".location p");
const  notificationElement = document.querySelector(".notification");

const weather = {};

weather.temperature = {
    unit: "celsius"
}

const KELVIN = 273;

//API KEY
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
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(api);
    

    fetch(api) .then( function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then( function(){
        displayWeather();
    });
}

// function to display weather
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `<p title="click to convert to fahrenheit">${weather.temperature.value}°<span>C</span></p>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
      return (temperature * 9/5) + 32;
}

// click temp for conversion
tempElement.addEventListener("click", function(){
    
    
    if(weather.temperature.value === undefined) return;
        
    if(weather.temperature.unit == "celsius"){
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);
  
      

      tempElement.innerHTML =  `<p title="click to convert to celsius">${fahrenheit}°<span>F</span></p>`;
      weather.temperature.unit = "fahrenheit";

    }else{
        tempElement.innerHTML = `<p title="click to convert to fahrenheit">${weather.temperature.value}°<span title="click to convert to fahrenheit">C</span></p>`;
        weather.temperature.unit = "celcius";
    }
})
