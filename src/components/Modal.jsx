
import { Settings, Star, DoorOpen, Volume2, VolumeX, X } from "lucide-react";
import "../styles/Modal.css";

function Modal({ type, onClose, sound, onToggleSound }) {
  if (!type) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="game-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {type === "settings" && (
          <>
            <Settings className="modal-icon" size={32} />
            <h2>Settings</h2>
            <p>Make yourself comfortable!</p>

            <button className="sound-toggle" onClick={onToggleSound}>
              {sound ? <Volume2 /> : <VolumeX />}
              Sound: {sound ? "ON" : "OFF"}
            </button>
          </>
        )}

        {type === "credits" && (
          <>
            <Star className="modal-icon" size={32} />
            <h2>Credits</h2>
            <p>Made with ♡ and a little bit of chaos.</p>
            <p className="credit-name">BoredAndBeyond</p>
            <p>Created by a bored human, for bored humans.</p>
          </>
        )}

        {type === "exit" && (
          <>
            <DoorOpen className="modal-icon" size={32} />
            <h2>Leaving already?</h2>
            <p>But we haven't even wasted time yet! 😭</p>

            <button className="modal-action" onClick={onClose}>
              Okay, I'll stay!
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
