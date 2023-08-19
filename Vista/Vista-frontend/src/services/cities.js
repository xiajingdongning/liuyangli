import axios from 'axios';

class CityDataService {
    getAll() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/cities`);
    }

    getCityById(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/cities/id/${id}`);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new CityDataService();