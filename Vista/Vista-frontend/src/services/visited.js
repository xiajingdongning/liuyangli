import axios from 'axios';

class VisitedDataService {
    markCityAsVisited(userId, cityId) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/visited/${userId}/cities/${cityId}`);
    }

    getVisitedCitiesByUser(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/visited/${userId}`);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new VisitedDataService();
