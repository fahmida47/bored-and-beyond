
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import "../styles/NameEntry.css";

function NameEntry({ character, onContinue, onBack }) {
  const [playerName, setPlayerName] = useState("");

  const handleContinue = () => {
    const name = playerName.trim();

    if (!name) return;

    onContinue(name);
  };

  return (
    <motion.section
      className="name-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button className="name-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="name-box">
        <div className="name-sparkle">✦ ✧ ✦</div>

        <p className="name-eyebrow">ONE LAST THING...</p>

        <h1>What's your name?</h1>

        <p className="name-description">
          So we know who to blame for all this chaos. ♡
        </p>

        <div className="selected-character">
          You picked:{" "}
          <strong>
            {character === "boy" ? "The Boy" : "The Girl"}
          </strong>
        </div>

        <input
          type="text"
          className="player-name-input"
          placeholder="Enter your name..."
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          maxLength={20}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleContinue();
          }}
        />

        <button
          className="name-continue"
          onClick={handleContinue}
          disabled={!playerName.trim()}
        >
          <Sparkles size={17} />
          LET'S GO!
        </button>

        <p className="name-footer">
          Don't worry, your name won't be used against you. Probably.
        </p>
      </div>
    </motion.section>
  );
}

export default NameEntry;
