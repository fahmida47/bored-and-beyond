
import { motion } from "framer-motion";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import "../styles/SelectCharacter.css";

const characters = [
  {
    id: "boy",
    name: "The Boy",
    description: "Ready for a chaotic adventure.",
    image: "/images/boy-character.png",
    className: "boy-card",
    color: "blue",
    tags: ["Street Explorer", "Adventure Seeker"],
  },
  {
    id: "girl",
    name: "The Girl",
    description: "Cute look. Dangerous energy.",
    image: "/images/girl-character.png",
    className: "girl-card",
    color: "pink",
    tags: ["Travel Lover", "Chaos Creator"],
  },
];

function CharacterSelect({ onSelect, onBack }) {
  return (
    <main className="character-screen">
      <div className="character-background-glow" />

      <button className="character-back" onClick={onBack}>
        <ArrowLeft size={19} />
        Back
      </button>

      <header className="character-heading">
        <span className="character-eyebrow">
          <Sparkles size={16} />
          YOUR ADVENTURE STARTS HERE
        </span>

        <h1>
          Choose Your <span>Character</span>
        </h1>

        <p>
          Two characters. Seven divisions. Endless adventures.
        </p>
      </header>

      <section className="character-grid">
        {characters.map((character, index) => (
          <motion.article
            key={character.id}
            className={`character-card ${character.className}`}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ y: -8 }}
          >
            <div className="character-number">
              CHARACTER 0{index + 1}
            </div>

            <div className="character-art">
              <img
                src={character.image}
                alt={character.name}
                draggable="false"
              />
            </div>

            <div className="character-info">
              <h2>{character.name}</h2>
              <p>{character.description}</p>

              <div className="character-tags">
                {character.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <button
                className="character-select-button"
                onClick={() => onSelect(character.id)}
              >
                <Check size={18} />
                Select Character
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <footer className="character-footer">
        YOUR JOURNEY. YOUR RULES.
      </footer>
    </main>
  );
}

export default CharacterSelect;
