import React from 'react';
import './About.css'; // Import your custom CSS file for styling

function About() {
  return (
    <div className="about-us">
      <div className="about-row">
        <div className="image-container">
          <img src="./img/Yangli.jpg" alt="Yangli Liu" className="round-image" />
        </div>
        <div className="bio">
          <h2>Yangli Liu</h2>
          <p>I am an interdisciplinary artist 
            who works with visuals and storytelling.
            I like pushing creative 
            boundaries and breaking down the traditional barriers between different 
            art forms to create innovative, thought-provoking, and unique works. </p>
        </div>
      </div>
      <div className="about-row">
        <div className="image-container">
          <img src="./img/Yerin.jpg" alt="Yerin Lim" className="round-image" />
        </div>
        <div className="bio">
          <h2>Yerin Lim</h2>
          <p>I am an aspiring computer software engineer with a background in Finance.
            Currently, I'm studying comptuer science at graudate school.
            I am passionate to exploring the intersections of finance and computer science
            to create innovative solutions that optimize financial processes.</p>
        </div>
      </div>
      <div className="about-row">
        <div className="image-container">
          <img src="./img/Mike.jpg" alt="Yiqing Ma" className="round-image" />
        </div>
        <div className="bio">
          <h2>Yiqing Ma</h2>
          <p>Armed with expertise in media, communication, and multicultural studies.
           I've sharpened my competencies in the video production and software industries, 
           focusing on business negotiations and client relations. 
           My diverse background spanning the software and automotive sectors underscores my adaptability and breadth of industry experience.</p>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2023 Vista. All rights of Videos reserved By VR Gorilla Studio</p>
      </footer>
    </div>
  );
}

export default About;
