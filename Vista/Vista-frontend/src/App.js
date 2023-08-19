import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,  Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {ReactNavbar} from "overlay-navbar";
import "overlay-navbar/dist/index";
import Logo from './materials/logo.png'
import LandingPage from './components/Landing';
import CollectionPage from './components/Collection';
import ProfilePage from './components/Profile';
import VideoPage from './components/Video';
import AboutPage from './components/About';
import CityPage from './components/City';
import Login from './components/Login';
import Logout from './components/Logout';
import { GoogleOAuthProvider } from '@react-oauth/google';



const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    if (loginData) {
      let loginExp = loginData.exp;
      let now = Date.now()/1000;
      if (now < loginExp) {
        // Not expired
        setUser(loginData);
      } else {
        // Expired
        localStorage.setItem("login", null);
      }
    }
  }, []);

  

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
      <Router>
        {/* <div>
        { user ? (
                <div className='profile-logout-layout'>
                    <img className='MainProfilePhoto' src={user.picture} alt="profile_photo"></img>
                    <Logout setUser={setUser} clientId={clientId}/>
                </div>
            ) : (
                <div className='login-button'>
                <Login setUser={setUser}/>
                </div>
            )}
        </div> */}
        <div className='login-out'>
        { user ? (
                <div>
                    {/* <img className='MainProfilePhoto' src={user.picture} alt="profile_photo"></img> */}
                    <Logout setUser={setUser} clientId={clientId}/>
                </div>
            ) : (
                <div>
                <Login setUser={setUser}/>
                </div>
            )}
        </div>
          <ReactNavbar
          logo= {Logo}
          burgerColor="#FFCD29"
          navColor1="Black"
          burgerColorHover="#9747FF"
          logoWidth="40%"
          logoHoverColor="#9747FF"
          link1Size="1.6rem"
          link1Color="#ffcd29"
          link1Padding="2vmax"
          link1ColorHover="#9747FF"
          nav2justifyContent="flex-end"
          link1Margin="0vmax"
          link2Margin="0"
          link3Margin="0"
          link4Margin="0vmax"
          nav3justifyContent="flex-start"
          link1Text="Home"
          link1Url = "/"
          link1Family="Roboto"
          link2Text="City Collection"
          link2Url = {user ? "/city-collection" : "/"}
          link3Url = {user ? "/your-profile" : "/"}
          link3Text="Your Profile"
          link4Text="About US"
          link4Url="/about-us"
          nav4justifyContent="flex-start"
          searchIconMargin="0.5vmax"
          cartIconMargin="1vmax"
          profileIconMargin="0.5vmax"
          searchIconColor="#121212"
          cartIconColor="#121212"
          profileIconColor="#121212"
          searchIconColorHover="#9747FF"
          cartIconColorHover="#9747FF"
          profileIconColorHover="#9747FF"
        />
          <Routes>
            <Route path="/" element={<LandingPage user={user}/>} />
            <Route path="/city-collection" element={<CollectionPage user={user}/>} />
            <Route path="/your-profile" element={<ProfilePage user={user}/>} />
            {/* <Route path="/about-us" element={<VideoPage />} /> */}
            <Route path="/cities/:id" element={<CityPage />}/>
            <Route path="/video-page/:id" element={<VideoPage user={user}/>} />
            <Route path="/about-us" element={<AboutPage/>} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
