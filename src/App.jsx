
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Welcome from "./pages/Welcome";
import CharacterSelect from "./pages/CharacterSelect";
import NameEntry from "./pages/NameEntry";
import Story from "./pages/Story";
import LevelOne from "./pages/LevelOne";

import Modal from "./components/Modal";

import "./App.css";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [modal, setModal] = useState("");

  const [character, setCharacter] = useState("");
  const [playerName, setPlayerName] = useState("");

  const [sound, setSound] = useState(true);

  const handleCharacterSelect = (choice) => {
    setCharacter(choice);
    setScreen("name");
  };

  const handleNameContinue = (name) => {
    setPlayerName(name);
    setScreen("story");
  };

  const handleStartLevel = () => {
    setScreen("levelOne");
  };

  const handleBackToStory = () => {
    setScreen("story");
  };

  const handleRestart = () => {
    setCharacter("");
    setPlayerName("");
    setScreen("welcome");
  };

  return (
    <main className="game-screen">
      <div className="background-overlay" />

      <div className="version">v1.0.0</div>

      <AnimatePresence mode="wait">

        {screen === "welcome" && (
          <Welcome
            key="welcome"
            onStart={() => setScreen("character")}
            onSettings={() => setModal("settings")}
            onCredits={() => setModal("credits")}
            onExit={() => setModal("exit")}
          />
        )}

        {screen === "character" && (
          <CharacterSelect
            key="character"
            onSelect={handleCharacterSelect}
            onBack={() => setScreen("welcome")}
          />
        )}

        {screen === "name" && (
          <NameEntry
            key="name"
            character={character}
            onContinue={handleNameContinue}
            onBack={() => setScreen("character")}
          />
        )}

        {screen === "story" && (
          <Story
            key="story"
            playerName={playerName}
            character={character}
            onStartLevel={handleStartLevel}
          />
        )}

        {screen === "levelOne" && (
          <LevelOne
            key="levelOne"
            playerName={playerName}
            character={character}
            onBack={handleBackToStory}
            onNext={handleRestart}
          />
        )}

      </AnimatePresence>

      <Modal
        type={modal}
        onClose={() => setModal("")}
        sound={sound}
        onToggleSound={() => setSound((previous) => !previous)}
      />

    </main>
  );
}

export default App;
