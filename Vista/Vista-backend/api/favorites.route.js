import express from 'express'; 
import FavoritesController from './favorites.controller.js';

const router = express.Router(); 

router.route("/favorites").put(FavoritesController.apiUpdateFavorites);
router.route("/favorites/:userId").get(FavoritesController.apiGetFavorites);

export default router;
