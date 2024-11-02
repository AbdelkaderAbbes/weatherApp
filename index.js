let input = document.getElementById("input");
let searchBtn = document.getElementById("search");
let weatherInfo = document.getElementsByClassName("weather-info")[0];
let msg = document.getElementsByClassName("msg")[0];
let api_key = "bd10a7efd34f5a282ab178065682a12d";

searchBtn.addEventListener("click", function () {
  msg.innerText = "";
  weatherInfo.innerHTML = "";
  if (input.value.trim()) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api_key}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let { main, sys, weather } = data;
        let markup = `
        <h2>
          <span>${
            input.value.charAt(0).toUpperCase() + input.value.slice(1)
          }</span>
          <sup>${sys.country}</sup>
        </h2>
        <div>${main.temp} <sup>°</sup></div>
        <figure>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
              weather[0].icon
            }.svg"
          />
          <figcaption>${weather[0].description}</figcaption>
        </figure>`;
        weatherInfo.innerHTML = markup;
      })
      .catch((e) => {
        msg.innerText = "Please search for a valid city 😩";
      });
  }
});
