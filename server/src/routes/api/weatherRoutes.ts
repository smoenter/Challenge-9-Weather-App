import { Router, type Request, type Response } from 'express';
import weatherService from '../../service/weatherService';
import historyService from '../../service/historyService';

const router = Router();


// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;

  // TODO: GET weather data from city name
  try {
    const weatherData = await weatherService.getWeatherForCity(city);

    // TODO: save city to search history
    await historyService.addCity(city);

    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const cities = await historyService.getCities();
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await historyService.removeCity(id);
    res.status(200).json({ message: 'City removed from search history' });
  } catch (error) {
    console.error('Error removing city from search history:', error);
    res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});
 

export default router;

