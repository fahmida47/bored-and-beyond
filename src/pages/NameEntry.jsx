
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Sparkles, ArrowRight } from "lucide-react";
import "../styles/NameEntry.css";

function NameEntry({ character, onContinue, onBack }) {
  const [playerName, setPlayerName] = useState("Traveler");

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = playerName.trim();

    if (!name) return;

    onContinue(name);
  };

  return (
    <main className="name-screen">
      <button className="name-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Back
      </button>

      <motion.section
        className="name-card"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="name-icon">
          <MapPin size={30} />
        </div>

        <span className="name-eyebrow">
          <Sparkles size={15} />
          YOUR ADVENTURE AWAITS
        </span>

        <h1>
          What's Your <span>Name?</span>
        </h1>

        <p className="name-description">
          Every legend needs a name. What should we call you?
        </p>

        <div className="name-character-preview">
          <img
            src={
              character === "boy"
                ? "/images/boy-character.png"
                : "/images/girl-character.png"
            }
            alt="Selected character"
          />

          <div>
            <span>YOUR SELECTED CHARACTER</span>
            <strong>
              {character === "boy" ? "The Boy" : "The Girl"}
            </strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="player-name">PLAYER NAME</label>

          <input
            id="player-name"
            type="text"
            placeholder="Enter your name..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={18}
            autoComplete="off"
            required
          />

          <button
            type="submit"
            className="name-continue"
            disabled={!playerName.trim()}
          >
            Start My Journey
            <ArrowRight size={20} />
          </button>
        </form>

        <div className="name-footer">
          SEVEN DIVISIONS. ONE BIG ADVENTURE.
        </div>
      </motion.section>
    </main>
  );
}

export default NameEntry;

