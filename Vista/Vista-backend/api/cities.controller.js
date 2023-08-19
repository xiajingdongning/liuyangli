import CitiesDAO from '../DAO/citiesDAO.js';

export default class CitiesController {
  static async apiGetCities(req, res, next) {

    const { citiesList, totalNumCities } = await CitiesDAO.getCities();
    
    let response = {
      cities: citiesList,
      total_results: totalNumCities,
    };
    res.json(response);
  }

  static async apiGetCityByID(req, res, next) {
    try {
      let id = req.params.id || {};
      let city = await CitiesDAO.getCityByID(id);
      if (!city) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(city);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetFavorites(req, res, next) {
    try {
      res.json([{a:1111}]);
    } catch(e) {
      console.log(`API error: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}

