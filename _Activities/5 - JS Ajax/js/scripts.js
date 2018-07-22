// Reference to this stack overflow solution for using async:
// https://stackoverflow.com/questions/48702645/wait-for-complete-response-from-async-ajax-tfrom-api-call

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('weather-app-submit').addEventListener('click', getWeather);
    document.getElementById('post-request-submit').addEventListener('click', submitRequest);

    // IIFE for handling click events on the panel
    (function() {

        let elSelector = Array.from(document.querySelectorAll('.data-control'));
        let elPanels = Array.from(document.querySelectorAll('.input-panel'));

        console.log(elPanels);

        const handleClick = function(e) {
            e.preventDefault();

            let current = e.currentTarget;
            // If the current clicked element already has the selected class exit the function
            if(current.classList.contains('selected')) {
                return;
            }

            // Remove the selected class from all data-control classes
            elSelector.forEach(function(node) {
                node.classList.remove('selected');
            });
            // Add the selected class to the current event target
            current.classList.add('selected');
            // Loop through each panel and remove the active class
            elPanels.forEach(function(node) {
                node.classList.remove('active');
            });
            // Set a reference to the current target's a.href attribute
            let anchorReference = current.querySelector('a').getAttribute('href');
            let activePanel = document.querySelector(anchorReference);
            // Add the active class to the corresponding panel
            activePanel.classList.add('active');

        };

        elSelector.forEach(function(node) {

            node.addEventListener('click', handleClick);

        });
    })();

    function getWeather(event) {

        // Prevent default form submission event (don't want it refreshing the page)
        event.preventDefault();

        let info = {
            zip: document.getElementById('weather-info-zip').value,
            city: document.getElementById('weather-info-city').value,
            unit: function() {

                let imperial = document.getElementById('unit_imperial');

                if (imperial.checked) {

                    return 'imperial';

                }

                return 'metric';


            },
            dataType: function() {

                let panelZip = document.querySelector('.input-panel-zip');

                if (panelZip.classList.contains('active')) {

                    return ("zip=" + info.zip);

                }

                return ("q=" + info.city);


            },
            apikey: 'e66f888ed291ed592226b17cc91e9ddb'
        };


        // Check to make sure the input fields are not blank
        if ( document.querySelector('.input-panel-zip').classList.contains('active') ) {
            if (info.zip === "") {

                alert('Please input your zip code in the input field.');
                return;

            }
        }
        else if ( document.querySelector('.input-panel-city').classList.contains('active')) {
            if(info.city === "") {
                alert('Please input your city in the input field.');
                return;
            }
        }

        let req = new XMLHttpRequest();
        let weatherResponse = null;

        req.open("GET", "http://api.openweathermap.org/data/2.5/weather?" + info.dataType() + "&units=" + info.unit() + "&APPID=" + info.apikey, true);
        req.send();

        // Hide the output container briefly and display the loading text
        document.querySelector('.weather-output').classList.remove('show');
        document.querySelector('.loading').classList.add('show');

        req.onreadystatechange = function() {

            if(this.readyState === 4) {

                if(this.status === 200) {
                    // Show the output container and hide the loading text
                    document.querySelector('.weather-output').classList.add('show');
                    document.querySelector('.loading').classList.remove('show');

                    weatherResponse = JSON.parse(req.responseText);

                    // outputWeather callback
                    outputWeather(weatherResponse, info.unit());
                }
                else {
                    document.querySelector('.loading').classList.remove('show');
                    alert("There was an error handling the ajax request.");
                }
            }
        };
    }

    function outputWeather(weatherResponse, unit) {

        this.weather = weatherResponse;
        this.metric = unit;

        let $container = document.querySelector('.weather-output');

        city = this.weather.name + ', ' + this.weather.sys.country;
        metric = (this.metric === 'imperial' ? 'fahrenheit' : 'celsius');
        temp = this.weather.main.temp;
        humidity = this.weather.main.humidity;


        $container.querySelector('.city').innerHTML = city;
        $container.querySelector('.temp').innerHTML = temp + " (" + metric + ")";
        $container.querySelector('.humidity').innerHTML = humidity;

    }

    function submitRequest(event) {

        event.preventDefault();

        let req = new XMLHttpRequest();
        let payload = document.getElementById('post-request-input').value;
        let postResponse = null;

        req.open("POST", 'http://httpbin.org/post', true);
        req.setRequestHeader('Content-Type', 'application/json');

        req.send(JSON.stringify(payload));

        document.querySelector('.post-request-output').classList.remove('show');
        document.querySelector('.post-loading').classList.add('show');

        req.onreadystatechange = function() {
            if(this.readyState === 4) {
                if (this.status === 200) {
                    document.querySelector('.post-request-output').classList.add('show');
                    document.querySelector('.post-loading').classList.remove('show');

                    postResponse = JSON.parse(req.responseText);
                    document.querySelector('.post-request-data').innerHTML = postResponse.data;
                }
                else {
                    alert('There was an issue with the post request handler.');
                }
            }
        };
    }
});