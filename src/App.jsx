import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  const fights = [
    {
      id: 1,
      fighter1: { name: "ALEX PEREIRA", country: "Brazil", image: "./alex-pereira.png", stats: { record: "C", height: "6'4\"", weight: "205 LB", reach: "79\"" } },
      fighter2: { name: "JIŘÍ PROCHÁZKA", country: "Czechia", image: "./jiri-prochazka.png", stats: { record: "#1", height: "6'3\"", weight: "205 LB", reach: "80\"" } },
      title: "LIGHT HEAVYWEIGHT TITLE BOUT",
      odds: { fighter1: "-148", fighter2: "+124" }
    },
    {
      id: 2,
      fighter1: { name: "BRIAN ORTEGA", country: "United States", image: "./brian-ortega.png", stats: { record: "#3", height: "5'9\"", weight: "145 LB", reach: "69\"" } },
      fighter2: { name: "DIEGO LOPES", country: "Brazil", image: "./diego-lopes.png", stats: { record: "#14", height: "5'8\"", weight: "145 LB", reach: "70\"" } },
      title: "LIGHTWEIGHT BOUT",
      odds: { fighter1: "+120", fighter2: "-142" }
    },
    {
      id: 3,
      fighter1: { name: "ANTHONY SMITH", country: "United States", image: "./anthony-smith.png", stats: { record: "#10", height: "6'4\"", weight: "205 LB", reach: "76\"" } },
      fighter2: { name: "ROMAN DOLIDZE", country: "Georgia", image: "./roman-dolidze.png", stats: { record: "-", height: "6'2\"", weight: "205 LB", reach: "76\"" } },
      title: "LIGHT HEAVYWEIGHT BOUT",
      odds: { fighter1: "-", fighter2: "-" }
    },
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
      <header className="event-header">
        <h1 className="event-title">UFC 303</h1>
        <p className="event-info">Sat, Jun 29 / 7:00 PM PDT, T-Mobile Arena, Las Vegas United States</p>
        <button className="watch-button">HOW TO WATCH</button>
      </header>
      <nav className="event-nav">
        <button className="nav-button active">MAIN CARD</button>
        <button className="nav-button">PRELIMS</button>
        <button className="nav-button">EARLY PRELIMS</button>
      </nav>
      <div className="fight-cards-container">
        {fights.map((fight) => (
          <div key={fight.id} className="fight-container">
            <div className="fighter-card">
              <img className="fighter-image" src={fight.fighter1.image} alt={fight.fighter1.name} />
              <h2 className="fighter-name">{fight.fighter1.name}</h2>
              <p className="fighter-country">{fight.fighter1.country}</p>
              {fight.fighter1.stats.record === "C" && <span className="champion-badge">C</span>}
              {fight.fighter1.stats.record !== "C" && <span className="fighter-rank">{fight.fighter1.stats.record}</span>}
            </div>
            <div className="fight-details">
              <h3 className="fight-title">{fight.title}</h3>
              <div className="vs-container">VS</div>
              <div className="odds-container">
                <span className="odds">{fight.odds.fighter1}</span>
                <span className="odds-label">ODDS</span>
                <span className="odds">{fight.odds.fighter2}</span>
              </div>
            </div>
            <div className="fighter-card">
              <img className="fighter-image" src={fight.fighter2.image} alt={fight.fighter2.name} />
              <h2 className="fighter-name">{fight.fighter2.name}</h2>
              <p className="fighter-country">{fight.fighter2.country}</p>
              <span className="fighter-rank">{fight.fighter2.stats.record}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="audio-button" onClick={handleButtonClick}>
        {isPlaying ? "Pause Sound" : "Play Sound"}
      </button>
    </div>
  );
}

export default App;