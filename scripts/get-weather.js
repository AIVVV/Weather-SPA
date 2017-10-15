// Define vars
var http,
    dayCounter = 1;

// Check if user use modern or old browsers 
if (window.XMLHttpRequest) {
    http = new XMLHttpRequest();
} else {
    http = new ActiveXObject("Microsoft.XMLHTTP");
}

// Simple Constructor - create data object 
function Obj(dayName, icon, weather, maxTemp, minTemp, windSpeed) {
    this.dayName = dayName;
    this.icon = icon;
    this.weather = weather;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.windSpeed = windSpeed;
}

//fucntion for send request and get data from API
function sendRequest(city, method) {
    return new Promise(function(resolve, reject) {
        url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&appid=f631fd357c75163a46154773a513dd64";
        http.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                dayCounter = 1;
                
                // parse JSON data from API to a javaScript Object
                var data = JSON.parse(http.responseText);

                // create weather object for current city wich user enter
                var weatherInfo = {
                    country: data.city.country,
                    city: data.city.name,
                    days: []
                };

                // loop for getting all needed data from javaScript Object API data
                for (var i = 0; i < data.list.length - 2; i++) {
                    weatherInfo.days.push(new Obj(
                        dayCounter,
                        "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png",
                        data.list[i].weather[0].description,
                        Math.round(data.list[i].temp.max - 273.15),
                        Math.round(data.list[i].temp.min - 273.15),
                        Math.round((data.list[i].speed) * 10) / 10
                    ));
                    dayCounter++;
                }

              resolve(weatherInfo);
            }
            if (this.status === 400) {
              var validCity = {'info':'Enter valid city name.'};
              reject(validCity);
            }
            if (this.status === 404) {
              var notFound = {'info':'The city is not found.'};
              reject(notFound);
            }
        };

        http.onerror = function() {
            var notFound = {'info':'Something went wrong! Please try again latter.'};
            reject(this.statusText);
        };

        http.open(method, url, true);
        http.send();
    });
}



