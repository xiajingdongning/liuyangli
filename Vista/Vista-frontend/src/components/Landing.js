import './Landing.css';
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';
import Home from '../materials/HomePage.jpg';
//import Logo from '../materials/logo.png'
//import { BrowserRouter as Router } from "react-router-dom";
//import {ReactNavbar} from "overlay-navbar";
//import "overlay-navbar/dist/index";
import CityDataService from "../services/cities";
import VisitedDataService from '../services/visited';

function Landing() {
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLeftMouseDown, setIsLeftMouseDown] = useState(false);
  const viewerRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate(); 

  const handleMouseMove = (event) => {
    const newX = event.clientX;
    const newY = event.clientY;

    // Determine if cursor is moving from left to right or right to left
    setIsFlipped(newX > cursorX);

    // Update cursor position
    setCursorX(newX);
    setCursorY(newY);
  };

  useEffect(() => {
    // Add event listener to track cursor movement
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Remove event listener on component unmount
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: Home,
    });

    return () => {
      viewer.destroy();
    };
  }, []);

  // For endpoint API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        CityDataService.getAll()
        .then((response) => {
          const sortedCities = response.data.cities.sort((a, b) => a.CityName.localeCompare(b.CityName));
          setCities(sortedCities);
        })

      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleCityClick = async (city) => {
    setSelectedCity(city);
    navigate(`/cities/${city._id}`);

    await saveVisitedCityForUser(city._id);
  };

  const saveVisitedCityForUser = async (cityId) => {
    const loginInfo = JSON.parse(localStorage.getItem("login"));
    if (loginInfo) {
      const userId = loginInfo.googleId;
      if (!userId) {
        console.error("No user ID found!");
        return;
      }
      try {
        const response = await VisitedDataService.markCityAsVisited(userId, cityId);
  
        if (response && response.data && response.data.message === 'City already visited') {
          console.log('You have already visited this city!');
        } else {
          console.log('City marked as visited!');
        }
      } catch (err) {
        console.error('Failed to mark city as visited:', err);
      }
    } 

  };


  return (
    <div className="Landing">
      <div
        className={`custom-cursor ${isFlipped ? 'flipped' : ''}`}
        style={{
          left: `${cursorX-100}px`,
          top: `${cursorY-100}px`,
        }}
      />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <div ref={viewerRef} id="viewer" style={{ width: '100vw', height: '100vh' }}></div>
      <div className="overlay-text">
        <h1 className="typing-text">
          <span className="letter">V</span>
          <span className="letter">i</span>
          <span className="letter">s</span>
          <span className="letter">t</span>
          <span className="letter">a</span>
        </h1>
      </div>
      <div className="overlay-dropdown">
        <div className={`dropdown ${showDropdown ? 'show' : ''}`}>
            <button className="dropdown-toggle" onClick={handleDropdownToggle}>
              {selectedCity ? selectedCity.CityName : 'Start Your Journey'}
            </button>
            {showDropdown && (
              <ul className="dropdown-menu">
                { cities.map((city) => {
                  return(
                    <li key={city._id} onClick={() => handleCityClick(city)}>   
                      {city.CityName}
                    </li>
                  )
					      })}
              </ul>
            )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
