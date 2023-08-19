import FavoritesDAO from '../DAO/favoritesDAO.js';

export default class FavoritesController {

  static async apiUpdateFavorites(req, res, next) {
    try {
      const FavoritesResponse = await FavoritesDAO.updateFavorites(req.body._id, req.body.favorites);
      var { error } = FavoritesResponse;

      if (error) {
        console.log(`Update error: ${e}`);
        res.status(500).json({ error });
      } else {
        res.json({ status: "success" });
      }
    } catch(e) {
      console.log(`Update error: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetFavorites(req, res, next) {
    try {
      let id = req.params.userId;
      let favorites = await FavoritesDAO.getFavorites(id);

      if (!favorites) {
        res.status(404).json({ error: "not found" });
        return;
      }

      res.json(favorites);
    } catch(e) {
      console.log(`API error: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
