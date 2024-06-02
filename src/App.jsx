import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const fights = [
    {
      id: 1,
      fighter1: { name: "ISLAM MAKHACHEV", country: "Russia", image: "./champ.png", stats: { record: "25-1-0", height: "5'10\"", weight: "177.00 LB", reach: "70.5 in" } },
      fighter2: { name: "DUSTIN POIRIER", country: "United States", image: "./fighterOnBack.png", stats: { record: "30-8-0", height: "5'9\"", weight: "168.00 LB", reach: "72 in" } },
    },
    {
      id: 2,
      fighter1: { name: "SEAN STRICKLAND", country: "United States", image: "./strictland.png", stats: { record: "#1", height: "6'1\"", weight: "185.00 LB", reach: "76 in" } },
      fighter2: { name: "PAULO COSTA", country: "Brazil", image: "./paulo.png", stats: { record: "#7", height: "6'0\"", weight: "185.00 LB", reach: "72 in" } },
    },
    {
      id: 3,
      fighter1: { name: "KEVIN HOLLAND", country: "United States", image: "./kevinNo.png", stats: { record: "#15", height: "6'3\"", weight: "170.00 LB", reach: "81 in" } },
      fighter2: { name: "MICHAL OLEKSIEJCZUK", country: "Poland", image: "./file.png", stats: { record: "-", height: "6'0\"", weight: "205.00 LB", reach: "74 in" } },
    },
    {
      id: 4,
      fighter1: { name: "NIKO PRICE", country: "United States", image: "./buffre.png", stats: { record: "-", height: "6'0\"", weight: "170.00 LB", reach: "76 in" } },
      fighter2: { name: "ALEX MORONO", country: "United States", image: "./las.png", stats: { record: "-", height: "5'11\"", weight: "170.00 LB", reach: "73 in" } },
    },
    {
      id: 5,
      fighter1: { name: "RANDY BROWN", country: "Jamaica", image: "./tallr.png", stats: { record: "-", height: "6'3\"", weight: "170.00 LB", reach: "78 in" } },
      fighter2: { name: "ELIZEU ZALESKI DOS SANTOS", country: "Brazil", image: "./ta.png", stats: { record: "-", height: "5'11\"", weight: "170.00 LB", reach: "73 in" } },
    },
  ];

  const funnyMessages = [
    "Pepe World: Where frogs fight dirty!",
    "Winner winner, fly dinner!",
    "Pepe World: Ribbit and rip it!",
    "The only thing more slippery than Pepe is the competition!",
    "In Pepe World, the only thing that gets bruised is the ego!",
    "Winners in Pepe World get a croak of approval!",
    "Hopping to victory, one punch at a time!",
    "Pepe World: The land of croaks and jokes!",
    "The road to victory is paved with lily pads and laughs!",
    "Every winner in Pepe World gets a pond full of bragging rights!"
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("./joe.mp3"));

  const handleButtonClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <a href="https://pump.fun/9g75CBnAFsZN3odqcmc8o4wtAHKkskSFiPUPYSLckr7T" target="_blank" rel="noopener noreferrer">Pump.Fun </a>
        <a href="https://t.me/PepeUFCPortal" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">DEX</a>
      </nav>
      <h1 className="main-title">PEPE UFC</h1>
      <div className="fight-cards-container">
        {fights.map((fight) => (
          <div key={fight.id} className="fight-container">
            <div className="fighter-card animate-left">
              <h2>{fight.fighter1.name}</h2>
              <img className="fighter-image" src={fight.fighter1.image} alt={fight.fighter1.name} />
              <h3 className="fighter-country">{fight.fighter1.country}</h3>
              <div className="fighter-stats">
                {Object.entries(fight.fighter1.stats).map(([key, value]) => (
                  <div className="stat" key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </div>
                ))}
              </div>
            </div>

            <div className="fight-details animate-fade">
              <img className="belt-image" src="./greenbelt.png" alt="Green Belt" />
              <h2>VS</h2>
              <div className="matchup-stats">
                <div className="stat">Height: {fight.fighter1.stats.height} vs {fight.fighter2.stats.height}</div>
                <div className="stat">Weight: {fight.fighter1.stats.weight} vs {fight.fighter2.stats.weight}</div>
                <div className="stat">Reach: {fight.fighter1.stats.reach} vs {fight.fighter2.stats.reach}</div>
              </div>
            </div>

            <div className="fighter-card animate-right">
              <h2>{fight.fighter2.name}</h2>
              <img className="fighter-image" src={fight.fighter2.image} alt={fight.fighter2.name} />
              <h3 className="fighter-country">{fight.fighter2.country}</h3>
              <div className="fighter-stats">
                {Object.entries(fight.fighter2.stats).map(([key, value]) => (
                  <div className="stat" key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer-bar">
        <div className="footer-content">
          {funnyMessages.map((message, index) => (
            <span key={index}>{message}</span>
          ))}
        </div>
      </div>
      <button className="audio-button" onClick={handleButtonClick}>
        {isPlaying ? "Pause Sound" : "Play Sound"}
      </button>
    </div>
  );
}

export default App;
