import { useState } from "react";

import Welcome from "./pages/Welcome";
import CharacterSelect from "./pages/SelectCharacter";
import NameEntry from "./pages/NameEntry";
import DivisionSelect from "./pages/DivisionSelect";

// Game world
import GameWorld from "./game/world/GameWorld";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [selectedDivision, setSelectedDivision] = useState(null);

  const [completedDivisions, setCompletedDivisions] = useState([]);

  // Character selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setCurrentPage("name");
  };

  // Player name
  const handleNameContinue = (name) => {
    setPlayerName(name.trim());
    setCurrentPage("divisions");
  };

  // Division selection
  const handleDivisionSelect = (division) => {
    setSelectedDivision(division);
    setCurrentPage("game");
  };

  // Complete a division
  const handleDivisionComplete = () => {
    if (!selectedDivision) return;

    setCompletedDivisions((previous) => {
      if (previous.includes(selectedDivision)) {
        return previous;
      }

      return [...previous, selectedDivision];
    });

    setCurrentPage("divisions");
  };

  // Restart game
  const handleRestart = () => {
    setSelectedCharacter(null);
    setPlayerName("");
    setSelectedDivision(null);
    setCompletedDivisions([]);
    setCurrentPage("welcome");
  };

  return (
    <div className="app-container">
      {currentPage === "welcome" && (
        <Welcome
          onStart={() => setCurrentPage("character")}
          onSettings={() => alert("Settings coming soon!")}
          onAbout={() =>
            alert(
              "BoredAndBeyond — Goriber GTA 6. Explore Bangladesh, one division at a time!"
            )
          }
          onExit={() => alert("Thanks for playing BoredAndBeyond!")}
        />
      )}

      {currentPage === "character" && (
        <CharacterSelect
          onSelect={handleCharacterSelect}
          onBack={() => setCurrentPage("welcome")}
        />
      )}

      {currentPage === "name" && (
        <NameEntry
          character={selectedCharacter}
          onContinue={handleNameContinue}
          onBack={() => setCurrentPage("character")}
        />
      )}

      {currentPage === "divisions" && (
        <DivisionSelect
          playerName={playerName}
          completed={completedDivisions}
          onSelect={handleDivisionSelect}
          onBack={() => setCurrentPage("name")}
        />
      )}

      {currentPage === "game" && (
        <GameWorld
          playerName={playerName}
          character={selectedCharacter}
          division={selectedDivision}
          onBack={() => setCurrentPage("divisions")}
          onComplete={handleDivisionComplete}
        />
      )}
    </div>
  );
}

export default App;