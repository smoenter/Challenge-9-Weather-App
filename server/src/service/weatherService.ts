import dotenv from 'dotenv';
dotenv.config();


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
    weatherImage: string;

    constructor(
      cityName: string,
      coordinates: Coordinates,
      temperature: number,
      humidity: number,
      windSpeed: number,
      condition: string,
      description: string,
      weatherImage: string,
    ) {
      this.cityName = cityName;
      this.coordinates = coordinates;
      this.temperature = temperature;
      this.humidity = humidity;
      this.windSpeed = windSpeed;
      this.condition = condition;
      this.description = description;
      this.weatherImage = weatherImage
    }
  }

 
//TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
 private destructureLocationData(locationData: any): Coordinates {
  const latitude = locationData.lat || locationData.latitude;
  const longitude = locationData.lon || locationData.longitude;
  return { latitude, longitude };
 }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(location:string): string {
    const apiKey =  process.env.WEATHER_API_KEY;
    const baseUrl = 'https://api.locationiq.com/v1/search.php';
    const format = 'json';
    const query = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(location)}&format=${format}`;
    return query;
}
 
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { latitude, longitude } = coordinates;
    const apiKey = process.env.WEATHER_API_KEY;
    return `${this.baseURL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(location: string): Promise<{ lat: number, lon: number }> {
    const query = this.buildGeocodeQuery(location);
    try {
        const response = await fetch(query);
        if (!response.ok) {
            throw new Error(`Error fetching location data: ${response.statusText}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            return { lat: parseFloat(lat), lon: parseFloat(lon) };
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
  private buildForecastArray(weatherData: any []) {
    const forecastArray = [];
    for (const data of weatherData) {
      if (!data || !data.main || !data.weather || !data.dt) {
        continue;
      }
      const date = new Date(data.dt *1000);
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidty;
      const windSpeed = data.wind.speed;

      forecastArray.push({
        date: date.toLocaleDateString(),
        temperature: temperature,
        description: weatherDescription,
        humidity: humidity,
        windSpeed: windSpeed
      });
    }
   return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<any> {
     try {
      const {lat, lon} = await this.fetchAndDestructureLocationData(city);
      const weatherData = await this.fetchWeatherData({ latitude: lat, longitude: lon });
      const currentWeather = this.parseCurrentWeather(weatherData);
      new Weather(
        city,
        { latitude: lat, longitude: lon },
        currentWeather.temperature,
        currentWeather.humidity,
        currentWeather.windSpeed,
        weatherData.weather[0].main,
        currentWeather.description,
        '' // Add a placeholder for weatherImage
      );
      const forecastArray = this.buildForecastArray([weatherData]);
      
      return {
        city,
        currentWeather,
        forecast: forecastArray
      };
     } catch (error) {
      console.error('Error fetching weather for city:', error);
      throw error;
     }
    }
  }


export default WeatherService;
