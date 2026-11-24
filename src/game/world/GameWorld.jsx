import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { ArrowLeft, Backpack, Heart, MapPin, Footprints } from "lucide-react";
import "./GameWorld.css";

const divisionNames = {
  dhaka: "Dhaka",
  chattogram: "Chattogram",
  rajshahi: "Rajshahi",
  khulna: "Khulna",
  barishal: "Barishal",
  sylhet: "Sylhet",
  rangpur: "Rangpur",
};

function Player({ onReachMission }) {
  const playerRef = useRef();
  const keys = useRef({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      keys.current[key] = true;
      if (key === "e") onReachMission();
    };
    const handleKeyUp = (event) => { keys.current[event.key.toLowerCase()] = false; };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onReachMission]);

  useFrame(({ camera }, delta) => {
    if (!playerRef.current) return;
    const direction = new THREE.Vector3();
    if (keys.current.w || keys.current.arrowup) direction.z -= 1;
    if (keys.current.s || keys.current.arrowdown) direction.z += 1;
    if (keys.current.a || keys.current.arrowleft) direction.x -= 1;
    if (keys.current.d || keys.current.arrowright) direction.x += 1;
    if (direction.length() > 0) {
      direction.normalize();
      playerRef.current.position.x += direction.x * 6 * delta;
      playerRef.current.position.z += direction.z * 6 * delta;
      playerRef.current.rotation.y = Math.atan2(direction.x, direction.z);
    }
    const targetCamera = new THREE.Vector3(playerRef.current.position.x, 5, playerRef.current.position.z + 9);
    camera.position.lerp(targetCamera, 1 - Math.exp(-5 * delta));
    camera.lookAt(playerRef.current.position.x, 1.2, playerRef.current.position.z - 2);
  });

  return <group ref={playerRef} position={[0, 0, 0]}>
    <mesh position={[0, 1.15, 0]} castShadow><capsuleGeometry args={[0.4, 1, 6, 12]} /><meshStandardMaterial color="#1b1832" /></mesh>
    <mesh position={[0, 2.05, 0]} castShadow><sphereGeometry args={[0.38, 16, 16]} /><meshStandardMaterial color="#f0c5a4" /></mesh>
  </group>;
}

function Building({ position, height, color }) {
  return <group position={position}>
    <mesh position={[0, height / 2, 0]} castShadow><boxGeometry args={[3, height, 3]} /><meshStandardMaterial color={color} /></mesh>
    {Array.from({ length: Math.floor(height / 1.5) }).map((_, i) => <mesh key={i} position={[0, i * 1.5 + 1, 1.51]}>
      <boxGeometry args={[0.6, 0.65, 0.04]} /><meshStandardMaterial color="#ffd98e" emissive="#ffb347" emissiveIntensity={0.35} />
    </mesh>)}
  </group>;
}

function MissionMarker() {
  return <Float speed={2} floatIntensity={0.4}><group position={[0, 2.2, -15]}>
    <mesh><torusGeometry args={[0.8, 0.08, 12, 32]} /><meshStandardMaterial color="#ff36bd" emissive="#ff36bd" emissiveIntensity={2} /></mesh>
    <mesh><sphereGeometry args={[0.25, 16, 16]} /><meshStandardMaterial color="#fff" emissive="#ff36bd" emissiveIntensity={2} /></mesh>
  </group></Float>;
}

function DhakaEnvironment({ onReachMission }) {
  const buildings = [[-5, 6, "#45415e"], [-5, 9, "#66516e"], [-5, 5, "#59475d"], [5, 7, "#59435e"], [5, 10, "#45415e"], [5, 6, "#75516d"]];
  return <>
    <color attach="background" args={["#8cb4ce"]} /><fog attach="fog" args={["#8cb4ce", 30, 75]} />
    <ambientLight intensity={1.5} /><directionalLight position={[8, 15, 5]} intensity={2} castShadow />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -15]} receiveShadow><planeGeometry args={[100, 100]} /><meshStandardMaterial color="#58604b" /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -15]}><planeGeometry args={[7, 100]} /><meshStandardMaterial color="#575257" /></mesh>
    {Array.from({ length: 12 }).map((_, i) => <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -i * 8]}><planeGeometry args={[0.12, 3]} /><meshBasicMaterial color="#e8d9a5" /></mesh>)}
    {buildings.map(([x, height, color], i) => <Building key={i} position={[x, 0, -i * 12]} height={height} color={color} />)}
    <MissionMarker /><Player onReachMission={onReachMission} />
  </>;
}

export default function GameWorld({ playerName = "Traveler", division = "dhaka", onBack = () => {}, onComplete = () => {} }) {
  const [missionComplete, setMissionComplete] = useState(false);
  const currentDivision = divisionNames[division] || "Dhaka";
  const completeMission = () => {
    if (missionComplete) return;
    setMissionComplete(true);
    onComplete();
  };

  return <main className="game-world">
    <Canvas shadows camera={{ position: [0, 5, 9], fov: 60 }}><DhakaEnvironment onReachMission={completeMission} /></Canvas>
    <header className="game-hud">
      <button className="hud-back" onClick={onBack}><ArrowLeft size={18} /> Back to map</button>
      <div className="hud-location"><MapPin size={16} /> {currentDivision}, Bangladesh</div>
      <div className="hud-stats"><span aria-label="3 lives"><Heart /><Heart /><Heart /></span><strong>$500</strong></div>
    </header>
    <aside className="mission-panel">
      <div className="mission-label"><MapPin size={16} /> MISSION 1: LOST RICKSHAW</div>
      <p>{missionComplete ? "Rickshaw found! Great work, explorer." : "Find the missing rickshaw near Lalbagh Fort."}</p>
      <div className="mission-progress"><span style={{ width: missionComplete ? "100%" : "0%" }} /></div>
      <small>{missionComplete ? "1 / 1 COMPLETE" : "0 / 1"}</small>
      {missionComplete && <button className="mission-continue" onClick={onComplete}>Continue exploring</button>}
    </aside>
    <div className="game-controls"><span><b>W A S D</b> : Move</span><span><b>Shift</b> : Run</span><span><b>E</b> : Interact</span></div>
    <button className="game-action" onClick={completeMission} aria-label="Interact"><Footprints size={24} /></button>
    <button className="game-bag" aria-label="Backpack"><Backpack size={25} /></button>
    <div className="minimap"><span className="map-pin">?</span><small>{currentDivision}</small></div>
    <div className="world-player">{playerName}</div>
  </main>;
}
