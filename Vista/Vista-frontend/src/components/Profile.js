import './Profile.css';
import { useEffect, useState } from "react";
import ReviewsDataService from '../services/reviews';
import VisitedDataService from '../services/visited';
import CityDataService from '../services/cities';

function Profile() {
  const [user, setUser] = useState(null);
  const [visitedCities, setVisitedCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentsList, setCommentsList] = useState([]);


  useEffect(() => {
    const storedUser = localStorage.getItem("login");
    console.log("User from localStorage:", storedUser);
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    if (!user || !user.googleId) {
      return;
    }
    console.log(user.googleId)
    ReviewsDataService.getReviewByUser(user.googleId)
      .then((response) => {

        console.log(response);
        setCommentsList(response.data);
      })
  }, [user])

  useEffect(() => {
    if (user && user.googleId) {
      fetchVisitedCities(user.googleId);
    }
  }, [user]);

  const fetchVisitedCities = async (userId) => {
    setIsLoading(true);
    try {
      const response = await VisitedDataService.getVisitedCitiesByUser(userId);
      console.log("Visited cities data:", response.data);

      const cityDetailsPromises = response.data.map(async (visitedCity) => {
        const cityDetailResponse = await CityDataService.getCityById(visitedCity.cityId);
        const cityDetail = cityDetailResponse.data;
        return {
          ...visitedCity,
          cityName: cityDetail.CityName
        };
      });

      const citiesWithDetails = await Promise.all(cityDetailsPromises);
      setVisitedCities(citiesWithDetails);
    } catch (err) {
      setError('Failed to fetch visited cities or details');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="Profile">
      <div className="overlay-text-new">
        <h2>Vista</h2>
      </div>
      <div className="profile-container">
      <div className="userContainer">
      <div className="left-column">
          <div className='name-photo'>
            <div className='userProfile'>
                <img className='profilePhoto' src={user?.picture} alt={user?.name}></img>

            </div>
            <div className="name">{user?.name}</div>
          </div>
        <div className="title">
          User Info
        </div>
        <div className="box box-top">
          <div className='userInfo'>

          {user && <p>Email: {user?.email}</p>}

          </div>
        </div>
      </div>
      <div className="right-column">
        <div className="title">
          User Activities
        </div>
        <div className="box box-top">
          {isLoading ? <p>Loading...</p> : visitedCities.map(city => (
            <div key={city._id}>  {city.cityName} - Date: {new Date(city.date).toLocaleDateString()} </div>
          ))}
          {error && <p>{error}</p>}
        </div>
        <div className="title">
          Your Comments
        </div>
          <div className="box box-bottom">
            {commentsList.map((comment, index) => {
              return (
                <div className='comment' key={index}>
                  {comment.city_name}: {comment.review}
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;