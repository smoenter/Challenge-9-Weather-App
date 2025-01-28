import fs from "node:fs/promises";
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
class City { 
  constructor(public name: string, public id: string) {
    this.name = name;
    this.id = id; 
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private searchHistoryFilePath = 'db/db.json';
  constructor () {

  }

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read() {
    return await fs.readFile(this.searchHistoryFilePath, {
       encoding: 'utf8',
    });
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City []): Promise<void> {
    return await fs.writeFile(this.searchHistoryFilePath, JSON.stringify(cities, null, 2), 'utf-8');
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
      const data = await this.read();
      let parsedCities: City[];
      try {
        parsedCities = JSON.parse(data);
      } catch (err) {
        parsedCities = [];
      }
      return parsedCities;
    }
  
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
async addCity(city: string): Promise<void> {
  try {
    const data = await fs.readFile(this.searchHistoryFilePath, 'utf8');
    const searchHistory = JSON.parse(data);
    const newCity = {
      id: uuidv4(),
      name: city,
    };
    searchHistory.push(newCity);
    await fs.writeFile(this.searchHistoryFilePath, JSON.stringify(searchHistory, null, 2));
    console.log(`City "${city}" added to search history.`);
  } catch (error) {
    console.error('Error adding city to search history:', error);
  }
}

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string) {
    const data = await fs.readFile(this.searchHistoryFilePath, 'utf8');
    const cities= JSON.parse(data);
    const updatedCities= cities.filter((city: { id: string }) => city.id !==id);
    await this.write(updatedCities);
    console.log(`City with id ${id} has been removed successfully.`);
  } catch (error: unknown) {
    console.error('Error removing city:', error);
  }
}
   
export default new HistoryService();




