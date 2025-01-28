import dotenv from 'dotenv';
dotenv.config();


// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  tempF: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  iconDescription: string;
  icon: string;
  date: string;

  constructor(
  city: string,
  tempF: number,
  humidity: number,
  windSpeed: number,
  condition: string,
  iconDescription: string,
  icon: string,
  date: string
  ) {
    this.city = city;
    this.tempF = tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.condition = condition;
    this.iconDescription = iconDescription;
    this.icon = icon;
    this.date = date;
  }
}


//TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string= process.env.API_BASE_URL || '';
  private apiKey: string = process.env.API_KEY || '';
  private cityName: string = '';

    
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: any): Coordinates {
    const lat = locationData.lat || locationData.latitude;
    const lon = locationData.lon || locationData.longitude;
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(location: string): string {
    const apiKey = this.apiKey;
    const baseUrl = 'http://api.openweathermap.org/geo/1.0/direct'
    const query = `${baseUrl}?appid=${apiKey}&q=${encodeURIComponent(location)}`;
    return query;
  }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(location: string): Promise<Coordinates> {
    const query = this.buildGeocodeQuery(location);
       try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(`Error fetching location data: ${response.statusText}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        return this.destructureLocationData(data[0]);
      } else {
        throw new Error('No location data found');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQueryUrl = this.buildWeatherQuery(coordinates);
    try {
      const response = await fetch(weatherQueryUrl);
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any): { temperature: number, description: string, humidity: number, windSpeed: number } {
    const temperature = response.main.temp;
    const description = response.weather[0].description;
    const humidity = response.main.humidity;
    const windSpeed = response.wind.speed;

    return {
      temperature,
      description,
      humidity,
      windSpeed
    };
  }

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(weatherData: any) {
    console.log('weatherData2', weatherData.list[1]);
    const forecastArray = [];
    const forecastData = weatherData.list.filter((weather: any) => weather.dt_txt.includes('12:00:00'));
    for (const data of forecastData) {
      if (!data || !data.main || !data.weather || !data.dt) {
        continue;
      }
      console.log('weatherData', data);
      const date = new Date(data.dt * 1000);
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
// TODO: push weather objects into forecast array
      const weather = new Weather(this.cityName, temperature, humidity, windSpeed, 'blank', weatherDescription, 'icon', date.toLocaleDateString());
      forecastArray.push(
        weather 
      );
    }
    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<any> {
    try {
      this.cityName = city;
      const { lat, lon } = await this.fetchAndDestructureLocationData(city);
      const weatherData = await this.fetchWeatherData({ lat, lon });
      // console.log('weatherData', weatherData);
      console.log('weatherList', weatherData.list[0]);
      const currentWeather = this.parseCurrentWeather(weatherData.list[0]);
      const forecastArray = this.buildForecastArray(weatherData);
      console.log(forecastArray);
      return [currentWeather, ...forecastArray];
      
    } catch (error) {
      console.error('Error fetching weather for city:', error);
      throw error;
    }
  }
}


export default WeatherService;
