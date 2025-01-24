import { Router, type Request, type Response } from 'express';
import weatherService from '../../service/weatherService';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  
  // TODO: GET weather data from city name

  
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// app.get('/api/terms/:id', (req: Request, res: Response) => {
//   const requestedId = Number.parseInt(req.params.id);

//   // Use the `.find()` array method to iterate through the terms to check if it matches `req.params.id`
//   const term = termData.find((term) => term.id === requestedId);

//   if (term) {
//     return res.json(term);
//   }

//   // Return a message if the term doesn't exist in our DB
//   return res.json('No match found');
// });


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});



// app.delete('/api/terms/:id', (req: Request, res: Response) => {
//   const requestedId = Number.parseInt(req.params.id);

//   // Find the index of the term in the termData array
//   const termIndex = termData.findIndex((term) => term.id === requestedId);

//   if (termIndex !== -1) {
//     // Remove the term from the termData array using splice
//     termData.splice(termIndex, 1);
//     return res.json('Term deleted');
//   }

//   // Return a message if the term doesn't exist in our DB
//   return res.json('No match found');
// });

export default router;

 