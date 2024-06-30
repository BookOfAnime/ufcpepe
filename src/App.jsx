import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Preload, SpotLight } from "@react-three/drei";
import * as THREE from 'three';
import "./App.css";
import LoadingScreen from './LoadingScreen';

function Scene({ spotlightIntensity, spotlightColor }) {
  const gltf = useLoader(GLTFLoader, '/mma.glb');
  const meshRef = useRef();
  const spotlightRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={gltf.scene} scale={[2, 2, 2]} position={[0, -1, 0]} />
      <SpotLight
        ref={spotlightRef}
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={spotlightIntensity}
        color={spotlightColor}
        castShadow
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

function CameraController({ cameraPosition }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.lookAt(0, 0, 0);
  }, [camera, cameraPosition]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([5, 5, 5]);
  const [spotlightIntensity, setSpotlightIntensity] = useState(1);
  const [spotlightColor, setSpotlightColor] = useState("#ffffff");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const moveCamera = (position) => {
    setCameraPosition(position);
  };

  const changeLighting = (intensity, color) => {
    setSpotlightIntensity(intensity);
    setSpotlightColor(color);
  };

  const fights = [
    {
      id: 1,
      fighter1: { name: "ALEX PEREIRA", country: "Brazil", image: "./first.jpeg", stats: { record: "C", height: "6'4\"", weight: "205 LB", reach: "79\"" } },
      fighter2: { name: "JIŘÍ PROCHÁZKA", country: "Czechia", image: "./second.jpeg", stats: { record: "#1", height: "6'3\"", weight: "205 LB", reach: "80\"" } },
      title: "LIGHT HEAVYWEIGHT TITLE BOUT",
      odds: { fighter1: "-148", fighter2: "+124" }
    },
    {
      id: 2,
      fighter1: { name: "BRIAN ORTEGA", country: "United States", image: "./thirdf.jpeg", stats: { record: "#3", height: "5'9\"", weight: "145 LB", reach: "69\"" } },
      fighter2: { name: "DIEGO LOPES", country: "Brazil", image: "./fourt.jpeg", stats: { record: "#14", height: "5'8\"", weight: "145 LB", reach: "70\"" } },
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas shadows>
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
          />
          <ambientLight intensity={0.2} />
          <Suspense fallback={null}>
            <Scene spotlightIntensity={spotlightIntensity} spotlightColor={spotlightColor} />
          </Suspense>
          <CameraController cameraPosition={cameraPosition} />
          <Preload all />
        </Canvas>
      </div>
      <div className="content-overlay">
        <div className="main-container">
          <header className="event-header">
            <h1 className="event-title">UFC 303</h1>
            <p className="event-info">Sat, Jun 29 / 7:00 PM PDT, T-Mobile Arena, Las Vegas United States... CA: 943Kzz9FNH5kRvUeqAUN22Hb8MgbiwkRJSBziLaypump</p>
          </header>
          <div className="scene-controls">
            <button onClick={() => moveCamera([5, 5, 5])}>Default View</button>
            <button onClick={() => moveCamera([0, 8, 0])}>Top View</button>
            <button onClick={() => moveCamera([8, 0, 0])}>Side View</button>
          
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default App;
