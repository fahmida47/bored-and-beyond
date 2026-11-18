
import { motion } from "framer-motion";
import { Play, Settings, Star, DoorOpen } from "lucide-react";
import "../styles/Welcome.css";

function Welcome({ onStart, onSettings, onCredits, onExit }) {
  return (
    <motion.section
      className="welcome-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="title-area">
        <div className="little-crown">♛</div>

        <h1 className="game-title">
          BoredAnd
          <span>Beyond</span>
        </h1>

        <p className="tagline">
          Nothing productive happens here. Promise. ♡
        </p>

        <div className="title-decoration">
          ✦ ───── ♡ ───── ✦
        </div>
      </div>

      <nav className="main-menu">
        <motion.button
          className="game-button start-button"
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
        >
          <Play size={21} fill="currentColor" />
          <span>Start Game</span>
        </motion.button>

        <motion.button
          className="game-button"
          whileHover={{ scale: 1.04, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSettings}
        >
          <Settings size={20} />
          <span>Settings</span>
        </motion.button>

        <motion.button
          className="game-button"
          whileHover={{ scale: 1.04, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCredits}
        >
          <Star size={20} fill="currentColor" />
          <span>Credits</span>
        </motion.button>

        <motion.button
          className="game-button"
          whileHover={{ scale: 1.04, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
        >
          <DoorOpen size={20} />
          <span>Exit</span>
        </motion.button>
      </nav>

      <p className="footer-note">Play. Chill. Repeat. ♡</p>
    </motion.section>
  );
}

export default Welcome;
