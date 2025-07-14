
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/PanelCarousel.css';

const PanelCarousel = () => {
  const competitors = [
    {
      name: 'St. Jude Soldier Competition',
      img: '/images/Barinaga.jpg',
      desc: "Matthew Barinaga was honored to have been nominated by FSU Tri Delta to represent Sigma Alpha Epsilon in the 2025 St. Jude Soldier competition. The event raised critical funds for St. Jude Children's Research Hospital, supporting pediatric cancer research and patient care. With a personal connection to the cause, Matthew was proud to support a mission that brings hope to countless families.",
    },
    {
      name: 'Real Bros on College Ave',
      img: '/images/NicoRosell.jpg',
      desc: "Nico Rosell was honored to represent Sigma Alpha Epsilon in Zeta Tau Alpha's 2025 Real Bros on College Ave competition, raising funds for breast cancer research through the ZTA Foundation. Inspired by his grandmothers' battles with the disease, Nico dedicated his campaign to them, bringing heartfelt passion to a cause that supports resilience and lasting impact.",
    },
    {
      name: 'Mr. Heart Throb',
      img: '/images/HarrisonCrosby.jpg',
      desc: "Harrison Crosby was honored to be nominated by Alpha Phi to represent Sigma Alpha Epsilon in the 2025 Mr. Heart Throb competition. Driven by a personal connection to women's heart health, he proudly raised funds and awareness for Alpha Phi's national philanthropy while building lasting connections with a community committed to meaningful change.",
    },
    {
      name: 'Anchorman',
      img: '/images/NickPetro.jpg',
      desc: "Nick Petrocelli was honored to represent Sigma Alpha Epsilon in Delta Gamma's 2025 Anchorman competition, supporting Service For Sight. Inspired by the cause and the women of Delta Gamma, he proudly took part in a week of philanthropy dedicated to empowering individuals with visual impairments.",
    },
    {
      name: 'Daggerman',
      img: '/images/ColeLibernini.jpg',
      desc: "Cole Libernini was honored to represent Sigma Alpha Epsilon in the 2025 Daggerman competition, nominated by the sisters of Kappa Delta. The event raised funds for the Tallahassee Children's Home Society and Prevent Child Abuse America. Cole proudly partnered with Kappa Delta to advocate for vulnerable youth, reflecting his deep commitment to community impact and youth support.",
    },
    {
      name: 'Mr. Casanova',
      img: '/images/BrooksUtter.jpg',
      desc: "Brooks Utter proudly represented Sigma Alpha Epsilon in the 2024 Mr. Casanova competition hosted by Kappa Alpha Theta, supporting CASA's mission to advocate for abused and neglected children. Over two weeks, he collaborated with the sisters of Theta to raise funds and awareness, embracing the opportunity to serve both his fraternity and a cause dedicated to helping youth find safe, permanent homes.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel 
        activeIndex={activeIndex} 
        onSelect={handleSelect}
        controls={true}
        indicators={true}
        interval={null}
      >
        {competitors.map((comp, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={comp.img}
              alt={comp.name}
              style={{
                width: '100%',
                height: '60vh',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      
      {/* Description always below image */}
      <div className="carousel-description-below">
        <h3>{competitors[activeIndex].name}</h3>
        <p>{competitors[activeIndex].desc}</p>
      </div>
    </div>
  );
};

export default PanelCarousel;
