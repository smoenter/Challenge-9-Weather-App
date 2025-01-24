import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY || '';  
const API_BASE_URL = process.env.API_BASE_KEY || '';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather{
    cityName: string;
    coordinates: Coordinates;
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    description: string;

    constructor(
      cityName: string,
      coordinates: Coordinates,
      temperature: number,
      humidity: number,
      windSpeed: number,
      condition: string,
      description: string,
    ) {
      this.cityName = cityName;
      this.coordinates = coordinates;
      this.temperature = temperature;
      this.humidity = humidity;
      this.windSpeed = windSpeed;
      this.condition = condition;
      this.description = description;
    }
  }

 
//TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string) {
    // need fetch and await 
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
 private destructureLocationData(locationData: Coordinates): Coordinates {
  const {latitude, longitude} = locationData;
  return {latitude, longitude};
 }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGrocodeQuery(): string {

  }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    const {latitude, longitude} = buildWeatherQuery;
    return {latitude, longitude};
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
private async fetchAndDestructureLocationData() {
  // Need fetch and await 
}

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates) {
    // Need fetch and await
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any) {

  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any []) {
    const {}
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string) {

  }
}

export default new WeatherService();
