document.addEventListener('DOMContentLoaded', function() {
    function setCurrentTime() {
        var now = new Date();

        let days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
         'Saturday'];
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
         'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let date = now.getDate();
        let month = months[now.getMonth()];
        let day = days[now.getDay()];
        let year = now.getFullYear();

        let today = `${day}, ${date} ${month} ${year}`;
        var moment;

        const timeFormat = function() {
            if (now.getHours() > 12) {
                moment = 'PM';
                let oneDay = now.getHours();
                let time = oneDay - 12;
                return `${time}`;
            } else {
                moment = 'AM';
                return `${now.getHours()}`;
            }
        };
        let hours = timeFormat();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        let currentTime = `${hours}:${minutes} ${seconds}${'s'} ${moment}`;

        document.getElementById('date').innerText = today + ' ' + currentTime;
    }
    setInterval(() => {
        setCurrentTime();
    }, 1000);
});

let weather = {
   'API_KEY_NAME': "7866cccc8d755cacb83528de3d002506",
   fetchWeather: function (city) {
       fetch('https://api.openweathermap.org/data/2.5/weather?q=' 
       + city + '&units=metric&appid=' + this.API_KEY_NAME)
       .then((response) => response.json())
       .then((data) => this.displayWeather(data));
   },
   displayWeather: function (data) {
       const { name } = data;
       const { icon, description } = data.weather[0];
       const { temp, humidity } = data.main;
       const { speed } = data.wind;
       const { all } = data.clouds;

       document.querySelector('.cloudy').innerText = description; 
       document.querySelector('#place').innerText = name; 
       document.querySelector('#temp').innerText = temp + "℃"; 
       document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/'
        + icon + '.png'; 
       document.querySelector('#describe').innerText = all + '%'; 
       document.querySelector('#humidity').innerText = humidity + '%'; 
       document.querySelector('#wind-speed').innerText = speed + 'km/h';
   },
   search: function () {
    this.fetchWeather(document.querySelector('#search-location').value);
   }
}

document.querySelector('#btn').addEventListener('onclick', function () {
    weather.search();
});

document.querySelector('#search-location').addEventListener('keyup', 
function (event) {
    if (event.key == 'Enter') {
        weather.search();
    }
});
// initial fetch
weather.fetchWeather('Lagos');





