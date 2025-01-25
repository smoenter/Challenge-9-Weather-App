import { type Request, type Response } from 'express';
import weatherService from '../../service/weatherService';
import historyService from '../../service/historyService';

const express = require('express');
const router = express.Router();


// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { city } = req.body;
  if (!city) {
    res.status(400).json({ error: 'City name is required' });
    return;
  }

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
interface City {
  id: string;
  name: string;
}

interface ErrorResponse {
  error: string;
}

router.get('/history', async (_: Request, res: Response): Promise<void> => {
  try {
    const cities: City[] = await historyService.getCities();
    res.status(200).json(cities);
  } catch (error) {
    console.error('Error fetching search history:', error);
    const errorResponse: ErrorResponse = { error: 'Failed to fetch search history' };
    res.status(500).json(errorResponse);
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

