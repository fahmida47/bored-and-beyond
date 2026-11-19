
import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Coffee,
  FileText,
  Smartphone,
  Keyboard,
  Play,
  Zap,
} from "lucide-react";

import "../styles/LevelOne.css";

const GAME_TIME = 30;
const TARGET_SCORE = 100;

function createItem(id) {
  const random = Math.random();

  let type = "assignment";

  if (random > 0.78) {
    type = "reels";
  } else if (random > 0.55) {
    type = "coffee";
  }

  return {
    id,
    type,
    x: Math.random() * 84 + 8,
    y: -10,
  };
}

function LevelOne({ playerName, character, onBack, onNext }) {
  const [screen, setScreen] = useState("instructions");
  const [isMoving, setIsMoving] = useState(false);

  const [game, setGame] = useState({
    playerX: 50,
    score: 0,
    timeLeft: GAME_TIME,
    items: [],
  });

  const nextId = useRef(0);
  const tickCount = useRef(0);
  const movementDirection = useRef(0);

  const characterImage =
    character === "boy"
      ? "/images/boy-character.png"
      : "/images/girl-character.png";

  // Move player one step
  const movePlayer = (direction) => {
    setGame((previous) => ({
      ...previous,
      playerX: Math.max(
        5,
        Math.min(95, previous.playerX + direction * 6)
      ),
    }));
  };

  // Start continuous movement
  const startMoving = (direction) => {
    movementDirection.current = direction;
    setIsMoving(true);
  };

  // Stop movement
  const stopMoving = () => {
    movementDirection.current = 0;
    setIsMoving(false);
  };

  // Start game
  const startGame = () => {
    nextId.current = 0;
    tickCount.current = 0;
    movementDirection.current = 0;

    setIsMoving(false);

    setGame({
      playerX: 50,
      score: 0,
      timeLeft: GAME_TIME,
      items: [],
    });

    setScreen("playing");
  };

  // Restart game
  const restartGame = () => {
    stopMoving();
    setScreen("instructions");
  };

  // Keyboard controls
  useEffect(() => {
    if (screen !== "playing") return;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (
        ["arrowleft", "arrowright", "a", "d"].includes(key)
      ) {
        event.preventDefault();
      }

      if (key === "arrowleft" || key === "a") {
        startMoving(-1);
      }

      if (key === "arrowright" || key === "d") {
        startMoving(1);
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();

      if (
        ["arrowleft", "arrowright", "a", "d"].includes(key)
      ) {
        stopMoving();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", stopMoving);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", stopMoving);
    };
  }, [screen]);

  // Continuous player movement
  useEffect(() => {
    if (screen !== "playing") return;

    const interval = setInterval(() => {
      const direction = movementDirection.current;

      if (direction === 0) return;

      setGame((previous) => ({
        ...previous,
        playerX: Math.max(
          5,
          Math.min(95, previous.playerX + direction * 2)
        ),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [screen]);

  // Game engine
  useEffect(() => {
    if (screen !== "playing") return;

    const interval = setInterval(() => {
      tickCount.current += 1;

      setGame((previous) => {
        const updatedItems = [];
        let newScore = previous.score;

        previous.items.forEach((item) => {
          const updatedItem = {
            ...item,
            y: item.y + (item.type === "reels" ? 1.8 : 1.5),
          };

          const collision =
            updatedItem.y >= 76 &&
            updatedItem.y <= 91 &&
            Math.abs(updatedItem.x - previous.playerX) < 10;

          if (collision) {
            if (item.type === "assignment") {
              newScore += 10;
            } else if (item.type === "coffee") {
              newScore += 20;
            } else {
              newScore = Math.max(0, newScore - 5);
            }
          } else if (updatedItem.y < 105) {
            updatedItems.push(updatedItem);
          }
        });

        if (Math.random() < 0.045 && updatedItems.length < 7) {
          updatedItems.push(createItem(nextId.current++));
        }

        const newTimeLeft =
          tickCount.current % 20 === 0
            ? Math.max(0, previous.timeLeft - 1)
            : previous.timeLeft;

        return {
          ...previous,
          score: newScore,
          timeLeft: newTimeLeft,
          items: updatedItems,
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [screen]);

  // Finish game
  useEffect(() => {
    if (screen === "playing" && game.timeLeft === 0) {
      stopMoving();
      setScreen("finished");
    }
  }, [game.timeLeft, screen]);

  // Reset movement when leaving gameplay
  useEffect(() => {
    if (screen !== "playing") {
      stopMoving();
    }
  }, [screen]);

  // Cleanup
  useEffect(() => {
    return () => {
      movementDirection.current = 0;
    };
  }, []);

  const won = game.score >= TARGET_SCORE;

  return (
    <motion.section
      className="deadline-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Animated Background */}

      <div className="animated-background">
        <div className="night-moon" />

        <div className="night-cloud cloud-one" />
        <div className="night-cloud cloud-two" />
        <div className="night-cloud cloud-three" />

        <div className="night-stars">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              style={{
                left: `${(index * 37) % 100}%`,
                top: `${(index * 23) % 65}%`,
                animationDelay: `${(index % 5) * 0.4}s`,
              }}
            >
              ✦
            </span>
          ))}
        </div>

        <div className="background-city">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              className={`background-building building-${index % 4}`}
              key={index}
            >
              {Array.from({ length: 6 }).map((_, windowIndex) => (
                <i key={windowIndex} />
              ))}
            </div>
          ))}
        </div>

        <div className="background-rooftop" />
      </div>

      <div className="deadline-container">

        {/* Header */}

        <div className="deadline-heading">
          <button className="deadline-back" onClick={onBack}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="deadline-title">
            <span>BOREDANDBEYOND.EXE</span>
            <h1>DEADLINE DODGER</h1>
            <p>LEVEL 01 · UNIVERSITY SURVIVAL</p>
          </div>

          <div className="deadline-level">LVL 01</div>
        </div>

        {/* Instructions */}

        {screen === "instructions" && (
          <motion.div
            className="instruction-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="instruction-eyebrow">
              <Zap size={16} />
              MISSION BRIEFING
            </div>

            <h2>HOW TO PLAY?</h2>

            <p className="instruction-intro">
              Hey {playerName || "player"}! University life is already
              hard. Let's make it harder. 💀
            </p>

            <div className="instruction-list">

              <div className="instruction-item">
                <div className="instruction-icon assignment-icon">
                  <FileText size={24} />
                </div>

                <div className="instruction-copy">
                  <h3>Collect Assignments</h3>
                  <p>Catch falling assignment files.</p>
                </div>

                <strong className="positive-points">+10</strong>
              </div>

              <div className="instruction-item">
                <div className="instruction-icon coffee-icon">
                  <Coffee size={24} />
                </div>

                <div className="instruction-copy">
                  <h3>Grab Coffee</h3>
                  <p>Because sleep is apparently optional.</p>
                </div>

                <strong className="positive-points">+20</strong>
              </div>

              <div className="instruction-item">
                <div className="instruction-icon reels-icon">
                  <Smartphone size={24} />
                </div>

                <div className="instruction-copy">
                  <h3>Avoid Reels</h3>
                  <p>Don't let notifications distract you.</p>
                </div>

                <strong className="negative-points">−5</strong>
              </div>

            </div>

            <div className="controls-section">
              <h3>HOW TO MOVE</h3>

              <div className="controls-grid">

                <div className="control-card">
                  <Keyboard size={22} />
                  <strong>KEYBOARD</strong>
                  <span>← → or A / D</span>
                </div>

                <div className="control-card">
                  <Smartphone size={22} />
                  <strong>MOBILE</strong>
                  <span>Left / Right buttons</span>
                </div>

              </div>
            </div>

            <div className="mission-box">
              <span>YOUR MISSION</span>
              <strong>100 POINTS</strong>
              <p>Reach 100 points within 30 seconds to win!</p>
            </div>

            <p className="instruction-roast">
              "Your GPA can't be saved here, but your score can." 💀
            </p>

            <motion.button
              className="start-game-button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startGame}
            >
              <Play size={19} fill="currentColor" />
              START PLAYING
            </motion.button>
          </motion.div>
        )}

        {/* Gameplay */}

        {screen === "playing" && (
          <div className="game-content">

            <div className="game-hud">
              <div className="hud-box">
                <span>SCORE</span>
                <strong>{game.score}</strong>
              </div>

              <div className="hud-box timer-box">
                <span>TIME LEFT</span>
                <strong>{game.timeLeft}s</strong>
              </div>

              <div className="hud-box">
                <span>TARGET</span>
                <strong>{TARGET_SCORE}</strong>
              </div>
            </div>

            <div className="deadline-arena">

              <div className="arena-message">
                COLLECT. SURVIVE. REPEAT.
              </div>

              {/* Falling Items */}

              {game.items.map((item) => (
                <div
                  key={item.id}
                  className={`falling-item falling-${item.type}`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                  }}
                >
                  {item.type === "assignment" && (
                    <FileText size={25} />
                  )}

                  {item.type === "coffee" && (
                    <Coffee size={25} />
                  )}

                  {item.type === "reels" && (
                    <Smartphone size={25} />
                  )}
                </div>
              ))}

              {/* Selected Character */}

              <div
                className={`game-player ${isMoving ? "is-running" : ""}`}
                style={{ left: `${game.playerX}%` }}
              >
                <img
                  src={characterImage}
                  alt={character === "boy" ? "Boy character" : "Girl character"}
                  className="player-character-image"
                  draggable="false"
                />

                <div className="player-name">
                  {playerName || "PLAYER"}
                </div>
              </div>

            </div>

            {/* Game Legend */}

            <div className="game-legend">
              <span><FileText size={14} /> +10</span>
              <span><Coffee size={14} /> +20</span>
              <span><Smartphone size={14} /> −5</span>
            </div>

            {/* Mobile Controls */}

            <div className="mobile-controls">
              <button
                onPointerDown={() => startMoving(-1)}
                onPointerUp={stopMoving}
                onPointerLeave={stopMoving}
                onPointerCancel={stopMoving}
                aria-label="Move left"
              >
                <ArrowLeft size={26} />
              </button>

              <span>MOVE YOUR CHARACTER</span>

              <button
                onPointerDown={() => startMoving(1)}
                onPointerUp={stopMoving}
                onPointerLeave={stopMoving}
                onPointerCancel={stopMoving}
                aria-label="Move right"
              >
                <ArrowRight size={26} />
              </button>
            </div>

          </div>
        )}

        {/* Result */}

        {screen === "finished" && (
          <motion.div
            className="result-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="result-trophy">
              {won ? <Trophy size={48} /> : "💀"}
            </div>

            <span className="result-label">
              {won ? "MISSION COMPLETED" : "MISSION FAILED"}
            </span>

            <h2>
              {won ? "YOU SURVIVED!" : "BETTER LUCK NEXT TIME!"}
            </h2>

            <div className="final-score">
              <span>YOUR FINAL SCORE</span>
              <strong>{game.score}</strong>
            </div>

            <p>
              {won
                ? "Okay, maybe you can survive university after all. 🥳"
                : "Congratulations. Your assignment is still pending. 💀"}
            </p>

            <button
              className="start-game-button"
              onClick={restartGame}
            >
              <RotateCcw size={18} />
              TRY AGAIN
            </button>

            <button
              className="next-level-button"
              onClick={onNext}
            >
              BACK TO MAIN MENU
            </button>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}

export default LevelOne;
