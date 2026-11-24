
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  MapPin,
  CheckCircle2,
  Compass,
} from "lucide-react";
import "../styles/DivisionSelect.css";

const divisions = [
  {
    id: "dhaka",
    name: "Dhaka",
    subtitle: "The City Adventure",
    place: "Lalbagh Fort • Old Dhaka",
    theme: "dhaka",
    status: "unlocked",
  },
  {
    id: "chattogram",
    name: "Chattogram",
    subtitle: "The Coastal Adventure",
    place: "Patenga Beach • Hills",
    theme: "chattogram",
  },
  {
    id: "rajshahi",
    name: "Rajshahi",
    subtitle: "The River Adventure",
    place: "Padma River • Mango Gardens",
    theme: "rajshahi",
  },
  {
    id: "khulna",
    name: "Khulna",
    subtitle: "The Forest Adventure",
    place: "Sundarbans • Mangrove Forest",
    theme: "khulna",
  },
  {
    id: "barishal",
    name: "Barishal",
    subtitle: "The River Life Adventure",
    place: "Floating Market • Rivers",
    theme: "barishal",
  },
  {
    id: "sylhet",
    name: "Sylhet",
    subtitle: "The Nature Adventure",
    place: "Jaflong • Tea Gardens",
    theme: "sylhet",
  },
  {
    id: "rangpur",
    name: "Rangpur",
    subtitle: "The Heritage Adventure",
    place: "Tajhat Palace • Countryside",
    theme: "rangpur",
  },
];

function DivisionSelect({ playerName, onSelect, onBack, completed = [] }) {
  return (
    <main className="division-screen">
      <header className="division-topbar">
        <button className="division-back" onClick={onBack}>
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="division-player">
          <Compass size={18} />
          <span>Welcome, {playerName || "Explorer"}</span>
        </div>
      </header>

      <section className="division-heading">
        <span className="division-eyebrow">
          <MapPin size={16} />
          THE LAND OF ADVENTURES
        </span>

        <h1>
          Select a Division to Explore
        </h1>

        <p>
          Seven divisions. Countless places. One unforgettable journey.
        </p>
      </section>

      <section className="division-grid">
        {divisions.map((division, index) => {
          const isCompleted = completed.includes(division.id);
          const isUnlocked =
            division.id === "dhaka" ||
            completed.includes(
              divisions[index - 1]?.id
            );

          const locked = !isUnlocked && !isCompleted;

          return (
            <motion.article
              key={division.id}
              className={`division-card ${division.theme} ${
                locked ? "is-locked" : ""
              }`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={locked ? {} : { y: -6 }}
            >
              <div className="division-card-overlay" />

              <div className="division-card-top">
                <span>0{index + 1} / 07</span>

                {isCompleted ? (
                  <span className="division-status completed">
                    <CheckCircle2 size={14} />
                    Completed
                  </span>
                ) : locked ? (
                  <span className="division-status locked">
                    <Lock size={13} />
                    Locked
                  </span>
                ) : (
                  <span className="division-status available">
                    Available
                  </span>
                )}
              </div>

              <div className="division-card-content">
                <span className="division-small-title">
                  {division.subtitle}
                </span>

                <h2>{division.name}</h2>

                <p>
                  <MapPin size={14} />
                  {division.place}
                </p>

                <button
                  className="division-enter"
                  disabled={locked || isCompleted}
                  onClick={() => onSelect(division.id)}
                >
                  {isCompleted
                    ? "Adventure Completed"
                    : locked
                    ? "Complete Previous World"
                    : "Explore Division"}
                </button>
              </div>
            </motion.article>
          );
        })}
      </section>

      <footer className="division-footer">
        COMPLETE ONE ADVENTURE TO UNLOCK THE NEXT
      </footer>
    </main>
  );
}

export default DivisionSelect;

