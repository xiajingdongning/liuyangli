import axios from 'axios';

const baseURL = 'http://localhost:5001';  

const api = axios.create({
  baseURL: baseURL
});

// export const ESTABLISHED_USER_ID = '64d64e0fea51ebfa3ac6d148';


const getFavorites = async (userId) => {   
  try {
    const response = await api.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/favorites/favorites/${userId}`);
    if (!response.data.favorites) {
        return [];
    }

    return response.data.favorites;
  } catch (error) {
    console.error(`Error occurred while fetching favorites: ${error}`);
    throw error;
  }
};

const updateFavorite = async (userId, itemArray) => {
  try {
    await api.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/favorites/favorites`, { _id: userId, favorites: itemArray });
  } catch (error) {
    console.error(`Error occurred while removing item from favorites: ${error}`);
    throw error;
  }
};


const favoritesService = {
    getFavorites,
    updateFavorite,

  };
  
  export default favoritesService;