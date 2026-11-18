
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import "../styles/CharacterSelect.css";

function CharacterSelect({ onSelect, onBack }) {
  return (
    <motion.section
      className="character-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <button className="character-back" onClick={onBack}>
        <ArrowLeft size={20} />
        Back
      </button>

      <header className="character-heading">
        <p className="eyebrow">★ PLAYER SELECT ★</p>

        <h1>Who's playing today?</h1>

        <p className="heading-subtitle">
          Pick your character. Choose your chaos. ♡
        </p>
      </header>

      <div className="character-grid">

        {/* Boy Character */}
        <motion.article
          className="character-card boy-card"
          whileHover={{ y: -7, scale: 1.02 }}
        >
          <span className="player-label">PLAYER 01</span>

          <img
            src="/images/boy-character.png"
            alt="Boy character"
            className="character-image"
          />

          <div className="character-info">
            <h2>The Boy</h2>
            <p>Professional overthinker.</p>

            <div className="character-tags">
              <span>CALM</span>
              <span>SLEEPY</span>
              <span>CHAOTIC</span>
            </div>

            <button
              className="select-button boy-select"
              onClick={() => onSelect("boy")}
            >
              <Sparkles size={15} />
              SELECT CHARACTER
            </button>
          </div>
        </motion.article>

        {/* Girl Character */}
        <motion.article
          className="character-card girl-card"
          whileHover={{ y: -7, scale: 1.02 }}
        >
          <span className="player-label">PLAYER 02</span>

          <img
            src="/images/girl-character.png"
            alt="Girl character"
            className="character-image"
          />

          <div className="character-info">
            <h2>The Girl</h2>
            <p>CEO of random thoughts.</p>

            <div className="character-tags">
              <span>CUTE</span>
              <span>BOLD</span>
              <span>CHAOTIC</span>
            </div>

            <button
              className="select-button girl-select"
              onClick={() => onSelect("girl")}
            >
              <Sparkles size={15} />
              SELECT CHARACTER
            </button>
          </div>
        </motion.article>

      </div>

      <p className="character-footer">
        ♡ Don't worry. Both are equally unserious. ♡
      </p>

    </motion.section>
  );
}

export default CharacterSelect;
