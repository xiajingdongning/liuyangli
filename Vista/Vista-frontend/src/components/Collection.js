import React, { useState, useEffect } from 'react';
import './Collection.css';
import Card from './Card';
import favoritesService from '../services/favorites';
import citiesService from '../services/cities';


function Collection({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [cities, setCities] = useState([]);
  const currentUserId = user?.googleId;

  useEffect(() => {
    citiesService.getAll().then(response => {
      console.log('Cities Response:', response);
      if (response && Array.isArray(response.data.cities)) {
        setCities(response.data.cities);
      }
    }).catch(error => {
      console.error('Error fetching cities:', error);
    });
  }, []);

  useEffect(() => {
    if (currentUserId) {
      favoritesService.getFavorites(currentUserId)
        .then(response => {
          setFavorites(response);
        })
        .catch(error => {
          console.error('Error fetching favorites:', error);
        });
    }
  }, [currentUserId]);

  return (
    <div className='collection'>
      <Card favorites={favorites} cities={cities}/>
    </div>
  )
}

export default Collection;




