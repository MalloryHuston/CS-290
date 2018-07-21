function getWeather() {

    event.preventDefault();

    let info = {
        zip: document.getElementById('weather-info-zip').value,
        city: document.getElementById('weather-info-city').value,
        unit: null,
        apikey: 'e66f888ed291ed592226b17cc91e9ddb'
    };


    let req = new XMLHttpRequest();
    req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + info.zip + "&units=imperial&APPID=" + info.apikey, false);
    req.send(null);
    let weather = JSON.parse(req.responseText);


    outputWeather(weather, info.city, info.zip);

}

function outputWeather(weather, city, zip) {

    this.weather = weather;
    this.city = city;
    this.zip = zip;

    console.log(this.weather);
    console.log(this.weather.name + ', ' + this.weather.sys.country);
    console.log(this.zip);
    console.log(this.weather.main.humidity);
    console.log(this.weather.main.temp);

}