import { useEffect } from "react";
import "../styles/Welcome.css"
import bgImage from "../assets/images/bg.jpg"

const Welcome = ({ onStart, onSettings, onAbout, onExit }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onStart?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onStart]);

  return (
    <div className="welcome-screen">
      <div className="welcome-game-wrapper">
        <img
          src={bgImage}
          alt="BoredAndBeyond Background"
          className="welcome-bg-image"
        />

        <div className="welcome-menu-overlay">
          <button
            type="button"
            className="welcome-hotspot-btn welcome-primary-glow"
            onClick={onStart}
            aria-label="Start Adventure"
          />
          <button
            type="button"
            className="welcome-hotspot-btn welcome-secondary-glow"
            onClick={onSettings}
            aria-label="Settings"
          />
          <button
            type="button"
            className="welcome-hotspot-btn welcome-secondary-glow"
            onClick={onAbout}
            aria-label="About"
          />
          <button
            type="button"
            className="welcome-hotspot-btn welcome-secondary-glow"
            onClick={onExit}
            aria-label="Quit Game"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
