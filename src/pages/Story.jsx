
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gamepad2, Smartphone } from "lucide-react";
import "../styles/Story.css";

function Story({ playerName, character, onStartLevel }) {
  const [storyStep, setStoryStep] = useState("intro");

  const dialogues = {
    intro: {
      title: `Hey, ${playerName}! 👀`,
      message: "Bored lagche? It's okay, cholo game kheli!",
      question: "But tar age ekta important question...",
      extra: "IUMS semester result ber hoyeche naki? 💀",
      choices: [
        { text: "Hae, result dise! 😭", next: "result" },
        { text: "Na, ekhono dey nai 😌", next: "noResult" },
      ],
    },

    noResult: {
      title: "WHATTT! 😭",
      message: "Ekhono result dey nai?",
      question: "University amader sathe ki game khelche?",
      extra: "Thak, result-er tension bad dao. Nijer game kheli!",
      choices: [
        { text: "Cholo game kheli! 🎮", next: "levelOne" },
        { text: "Age reels dekhi 📱", next: "reels" },
      ],
    },

    result: {
      title: "WAIT WAIT! 👀",
      message: "Result dise?!",
      question: "Accha, result kemon hoise?",
      extra: "Be honest. Ei game judge korbe na. Maybe. 💀",
      choices: [
        { text: "Bhalo hoise! 🥳", next: "goodResult" },
        { text: "Ektu kharap hoise... 😭", next: "badResult" },
      ],
    },

    badResult: {
      title: "NOOOOO! 😭",
      message: "Result dekhe depressed?",
      question: "It's okay! Life e onek kichu baki ache.",
      extra: "Nxt level khelo, mon valo hoye jabe! (Hopefully)",
      choices: [
        { text: "Let's play next level! 🎮", next: "levelOne" },
        { text: "Reels dekhi age 📱", next: "reels" },
      ],
    },

    goodResult: {
      title: "OHHH! SMART ONE! 🥳",
      message: "Tahole to depressed na!",
      question: "Tahole ki khelba, naki reels dekhba?",
      extra: "Choose wisely. Your screen time is watching you. 👀",
      choices: [
        { text: "Game kheli! 🎮", next: "levelOne" },
        { text: "Reels dekhi 📱", next: "reels" },
      ],
    },

    reels: {
      title: "REELS AGAIN?! 💀",
      message: "5 minute bolte bolte 3 ghonta chole gelo!",
      question: "Ekhono bored?",
      extra: "Instagram tomake entertain korte pareni. Amra try kori!",
      choices: [
        { text: "Okay, game kheli! 🎮", next: "levelOne" },
        { text: "Aro reels dekhi 😭", next: "reelsAgain" },
      ],
    },

    reelsAgain: {
      title: "GIRL/BRO PLEASE! 😭",
      message: "Tumi ki reels-er sathe permanent relationship-e acho?",
      question: "Phone ta ektu side-e rakho!",
      extra: "Cholo, ekta mini-game kheli.",
      choices: [
        { text: "Fineeee! Let's play! 🎮", next: "levelOne" },
      ],
    },

    levelOne: {
      title: "LEVEL 01 UNLOCKED! ✨",
      message: `Alright ${playerName}, let's see what you've got!`,
      question: "Ready for some unnecessary chaos?",
      extra: "Just remember... eta GTA 6 na. Normal game arki. 💀",
      choices: [
        { text: "START LEVEL 01 🚀", next: "levelOneStart" },
      ],
    },

    levelOneStart: {
      title: "LOADING... 🚀",
      message: "Your university survival mission starts now!",
      question: "Assignment, coffee ar reels notification...",
      extra: "Let's see if you can survive 30 seconds. 💀",
      choices: [
        { text: "LET'S DO THIS! 🎮", next: "startGame" },
      ],
    },
  };

  const current = dialogues[storyStep];

  return (
    <motion.section
      className="story-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="story-card">

        <div className="story-top">
          <span className="story-label">
            <Sparkles size={15} />
            BOREDANDBEYOND.EXE
          </span>

          <span className="story-version">STORY MODE</span>
        </div>

        <div className="story-avatar">
          {character === "boy" ? "🧢" : "🎀"}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={storyStep}
            className="story-dialogue"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h1>{current.title}</h1>

            <p className="story-message">
              {current.message}
            </p>

            <p className="story-question">
              {current.question}
            </p>

            <p className="story-extra">
              {current.extra}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="story-choices">
          {current.choices.map((choice, index) => (
            <motion.button
              key={choice.next}
              className={`story-choice choice-${index + 1}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (choice.next === "startGame") {
                  onStartLevel();
                } else {
                  setStoryStep(choice.next);
                }
              }}
            >
              {choice.next === "reels" ||
              choice.next === "reelsAgain" ? (
                <Smartphone size={18} />
              ) : (
                <Gamepad2 size={18} />
              )}

              {choice.text}
            </motion.button>
          ))}
        </div>

        <p className="story-footer">
          ♡ Your decisions are questionable. We respect that. ♡
        </p>

      </div>
    </motion.section>
  );
}

export default Story;
