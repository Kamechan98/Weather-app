export interface IWeather {
  name: string;
  weather: IWeatherDetails[];
  main: ITemp;
  sys: Isys;
}

interface IWeatherDetails {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface ITemp {
  temp: number;
  feels_like: number;
}

interface Isys {
  country: string;
  sunrise: string;
  sunset: string;
}
