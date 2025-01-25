import fs from "node:fs/promises";

// TODO: Define a City class with name and id properties
class City { 
  constructor(public name: string, public id: string) {
    this.name = name;
    this.id = id; 
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read() {
    return await fs.readFile('db/db.json', {
       encoding: 'utf8',
    });
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City []): Promise<void> {
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '\t'));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }
      return parsedCities;
    });
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
async addCity(city: string) {
  try {
    const data = await fs.readFile('searchHistory.json', 'utf8');
    const cities = JSON.parse(data);

    const newCity= {
      id: generateUniqueId(),
      name: city
    };
    cities.push(newCity);
    await this.write(cities);
    console.log(`City "${city}" has been added successfully.`);
  } catch (error) {
    console.error('Error adding city:', error);
  }
}


  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string) {
    const data = await fs.readFile('searchHistory.json', 'utf8');
    const cities= JSON.parse(data);
    const updatedCities= cities.filter((city: { id: string }) => city.id !==id);
    await this.write(updatedCities);
    console.log(`City with id ${id} has been removed successfully.`);
  } catch (error: unknown) {
    console.error('Error removing city:', error);
  }
}
   
export default new HistoryService();
function generateUniqueId() {
  throw new Error("Function not implemented.");
}

