// App.js
import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import "./App.css";

function Scene() {
  const gltf = useLoader(GLTFLoader, '/mma.glb');
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

function App() {
  const fights = [
    {
      id: 1,
      fighter1: { name: "ALEX PEREIRA", country: "Brazil", image: "./alex.jpg", stats: { record: "C", height: "6'4\"", weight: "205 LB", reach: "79\"" } },
      fighter2: { name: "JIŘÍ PROCHÁZKA", country: "Czechia", image: "./Per.jpg", stats: { record: "#1", height: "6'3\"", weight: "205 LB", reach: "80\"" } },
      title: "LIGHT HEAVYWEIGHT TITLE BOUT",
      odds: { fighter1: "-148", fighter2: "+124" }
    },
    {
      id: 2,
      fighter1: { name: "BRIAN ORTEGA", country: "United States", image: "./brian.jpeg", stats: { record: "#3", height: "5'9\"", weight: "145 LB", reach: "69\"" } },
      fighter2: { name: "DIEGO LOPES", country: "Brazil", image: "./lopez.jpeg", stats: { record: "#14", height: "5'8\"", weight: "145 LB", reach: "70\"" } },
      title: "LIGHTWEIGHT BOUT",
      odds: { fighter1: "+120", fighter2: "-142" }
    },
    {
      id: 3,
      fighter1: { name: "ANTHONY SMITH", country: "United States", image: "./anthny.jpeg", stats: { record: "#10", height: "6'4\"", weight: "205 LB", reach: "76\"" } },
      fighter2: { name: "ROMAN DOLIDZE", country: "Georgia", image: "./rom.jpeg", stats: { record: "-", height: "6'2\"", weight: "205 LB", reach: "76\"" } },
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
    <div className="app-container">
      <div className="canvas-container">
        <Canvas>
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
          />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <CameraController />
        </Canvas>
      </div>
      <div className="content-overlay">
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
      </div>
    </div>
  );
}

export default App;