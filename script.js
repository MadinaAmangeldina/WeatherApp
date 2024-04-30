function change_background() {
  const date = new Date();
  const hour = date.getHours();
  console.log(hour);
  if (hour <= 20 & hour > 9) {
    document.body.className = "day";
  } else if (hour > 20 || hour < 5) {
     document.body.className = "night";
  } else if (hour >= 5 & hour <= 9) {
    document.body.className = "morning";
    document.querySelector(".header").style.color = "rgb(111, 107, 107)";
    // document.getElementsByClassName(".container").style.backgroundColor = "rgb(111, 107, 107)";
  } else {
    document.body.className = "evening";
  }
}

change_background();

const apiKey = "cc9d0ab16c067c753b66a1d8b19678ad";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".inputBox input");
const searchBtn = document.querySelector(".inputBox button");
const weatherIcon = document.querySelector(".weather-icon");
const message = document.querySelector(".message");

setInterval(change_background, 1000 * 60 * 60);

async function getData(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)           // fetching api information
    const data = await response.json();
    const error = document.querySelector(".error");

    if (response.status === 200) {
      console.log(data);
      error.style.display = "none";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
      document.querySelector(".mintemp").innerHTML = Math.round(data.main.temp_min) + "°C";
      document.querySelector(".maxtemp").innerHTML = Math.round(data.main.temp_max) + "°C";
      document.querySelector(".feelslike").innerHTML = Math.round(data.main.feels_like) + "°C";

      const sunriseDate = new Date((data.sys.sunrise + data.timezone) * 1000);

      console.log((data.sys.sunrise + data.timezone) * 1000)
      console.log(sunriseDate.toLocaleTimeString().substring(0,5));
      console.log(sunriseDate);
      document.querySelector(".sunrise").innerHTML = sunriseDate.toLocaleTimeString().substring(0,5);

      const sunsetDate = new Date((data.sys.sunset + data.timezone)* 1000);

      console.log(sunsetDate.toLocaleTimeString().substring(0,5));
      console.log(sunsetDate);
      document.querySelector(".sunset").innerHTML = sunsetDate.toLocaleTimeString().substring(0,5);

      function change_mainIcon() {
        const date = new Date();
        const hour = date.getHours();
        console.log(hour);
        if (hour >= 9 & hour < 22) {
          if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            message.innerHTML = "It's partly cloudy outside!"
          } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            message.innerHTML = "It's sunny outside! You might want to wear sunglasses.";
          } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            message.innerHTML = "Don't forget an umbrella!"
          } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            message.innerHTML = "It's drizzzzling"
          } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";                                                          
            message.innerHTML = "The visibility could be reduced. Be cautious."
          } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
            message.innerHTML = "It's snowing. Be careful on roads."
          }
        } else {
          if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudyNight.png";
            message.innerHTML = "It's partly cloudy outside!"
          } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clearNight.png";
            message.innerHTML = "It's a starry night!";
          } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/nightRain.png";
            message.innerHTML = "Don't forget an umbrella!"
          } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/nightRain.png";
            message.innerHTML = "It's drizzzzling"
          } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/cloudyNight.png";                                                         
            message.innerHTML = "The visibility could be reduced. Be cautious."
          } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/nightSnow.png";
            message.innerHTML = "It's snowing. Be careful on roads."
          }
        }
      }
      
      change_mainIcon();
       

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".header").style.paddingBottom = "10px";
      document.querySelector(".header").style.paddingTop = "10px";
      document.querySelector(".card").style.marginTop = "0";
      document.querySelector(".mainContainer").style.paddingTop = "17px";

    } else {
      document.querySelector(".weather").style.display = "none";
      error.style.display = "block";

    }
  } catch (error) {
    return "Error";
  }
}

searchBtn.addEventListener('click', ()=> {
  getData(searchBox.value);
} )

searchBox.addEventListener('keypress', (e)=> {
  if (e.key === 'Enter') {
  getData(searchBox.value);
  };
} )