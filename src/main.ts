import "./style.css";
import axios from "axios";
import { IWeather } from "./models/IWeather";

document.getElementById("getWeather")?.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      getWeather(position.coords.longitude, position.coords.latitude);
    },
    () => {}
  );
});

const getWeather = async (lng: number, lat: number) => {
  const result = await axios.get<IWeather>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=e8afa6bb6ac1bf217d79e3e32ff54a3f&units=metric`
  );

  console.log(result.data);

  const container = document.getElementById("weather");

  const name = document.createElement("h2");
  const country = document.createElement("h3");
  const pTag = document.createElement("p");
  const temp = document.createElement("span");
  const sunrise = document.createElement("p");
  const sunset = document.createElement("p");
  const icon = document.createElement("img");

  name.innerHTML = result.data.name;
  country.innerHTML = result.data.sys.country;
  pTag.innerHTML = result.data.weather[0].description;
  temp.innerHTML = result.data.main.temp.toString() + " C";
  sunrise.innerHTML = result.data.sys.sunrise;
  sunset.innerHTML = result.data.sys.sunset;
  icon.src = `https://openweathermap.org/img/w/${result.data.weather[0].icon}.png`;

  container?.appendChild(name);
  container?.appendChild(country);
  container?.appendChild(pTag);
  container?.appendChild(icon);
  container?.appendChild(temp);
  container?.appendChild(sunrise);
  container?.appendChild(sunset);
};
