import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { useParams, useNavigate } from "react-router-dom";
import CityDataService from "../services/cities";
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './City.css';

const City = () => {

	let params = useParams();
	const navigate = useNavigate(); 

	const [cities, setCities] = useState([]);
	const [city, setCity] =useState({
		id: null,
		CityName: "",
		BriefDescription: "",
		Attractions: [],
		History: "",
		Neighborhoods: [],
		Restaurants: [],
		imagePath: ""
	});

	useEffect(() => {
		const getCity = (id) => {
			CityDataService.getCityById(id)
				.then((response) => {
					setCity({
						id: id,
						CityName: response.data.CityName,
						BriefDescription: response.data.BriefDescription,
						Attractions: response.data.Attractions,
						History: response.data.History,
						Neighborhoods: response.data.Neighborhoods,
						Restaurants: response.data.Restaurants,
						imagePath: response.data.imagePath
					});
				})
				.catch((e) => {
					console.log(e);
				})
		};
		getCity(params.id);
	}, [params.id])

	useEffect(() => {
		const fetchCities = async () => {
		  try {
			CityDataService.getAll()
			.then((response) => {
			  setCities(response.data.cities);
			})
	
		  } catch (error) {
			console.error('Error fetching cities:', error);
		  }
		};
		fetchCities();
	  }, []);

	return (
		<div className="City">
			<head>
        		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
      		</head>
			<div className="cityGuideContainer">
				<Container>
					<div className="responsive-two-column-grid">

					<div className="imagePanel">
						<img className="cityImage" src={city.imagePath} alt="picture"></img>
					</div>
					<div className="infoPanel">
						<div className="cityName">
							{city.CityName}
						</div>
						<div className="description">
							{city.BriefDescription}
						</div>
						<div className="buttonSpace">
							<Button className="videoButton" key={city.id} onClick={() => navigate(`/video-page/${city.id}`)}>
								360-degree Video
							</Button>
						</div>
						<Accordion>
							<Accordion.Item eventKey="0">
								<Accordion.Header>History</Accordion.Header>
								<Accordion.Body>
									{city.History}
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="1">
								<Accordion.Header>Attractions</Accordion.Header>
								<Accordion.Body>
									{city.Attractions.map((attraction, index) => {
										return(
											<Col key={index}>
												<h5 className="subtitle">{attraction.Name}</h5> 
												{attraction.Description}<br></br>
											</Col>
										)
									})}
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="2">
								<Accordion.Header>Neighborhoods</Accordion.Header>
								<Accordion.Body>
									{city.Neighborhoods.map((neighborhood, index) => {
											return(
												<Col key={index}>
													<h5 className="subtitle">{neighborhood.Name}</h5> 
													{neighborhood.Description}<br></br>
												</Col>
											)
									})}
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item eventKey="3">
								<Accordion.Header>Restaurants</Accordion.Header>
								<Accordion.Body>
									{city.Restaurants.map((restaurant, index) => {
												return(
													<Col key={index}>
														<h5 className="subtitle">{restaurant.Name}</h5> 
														{restaurant.Description}<br></br>
													</Col>
												)
										})}
								</Accordion.Body>
							</Accordion.Item>
						</Accordion>

					</div>

					</div>

				</Container>
			</div>
		</div>
	)
};

export default City;