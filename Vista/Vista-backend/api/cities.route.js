import express from 'express'; 
import CitiesController from './cities.controller.js';


const router = express.Router(); 

router.route ('/').get (CitiesController.apiGetCities) ; 
router.route ('/id/:id').get(CitiesController.apiGetCityByID);






export default router;