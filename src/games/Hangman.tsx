import { useState, useCallback, useEffect } from "react";

const WORDS = ["NEBULA", "QUASAR", "GALAXY", "PHOTON", "COSMIC", "PLASMA", "PULSAR", "VORTEX", "CIPHER", "MATRIX", "AURORA", "BINARY"];

const Hangman = () => {
  const [word, setWord] = useState("");
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(0);
  const maxWrong = 6;

  const newGame = useCallback(() => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuessed(new Set());
    setWrong(0);
  }, []);

  useEffect(() => { newGame(); }, [newGame]);

  const guess = (letter: string) => {
    if (guessed.has(letter)) return;
    const newGuessed = new Set(guessed);
    newGuessed.add(letter);
    setGuessed(newGuessed);
    if (!word.includes(letter)) setWrong((w) => w + 1);
  };

  const won = word.split("").every((l) => guessed.has(l));
  const lost = wrong >= maxWrong;
  const display = word.split("").map((l) => (guessed.has(l) || lost ? l : "_")).join(" ");

  const parts = ["😵", "🫲", "🫱", "👕", "🦵", "🦶"];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-1 text-sm">
        {parts.map((p, i) => (
          <span key={i} className={`transition-opacity ${i < wrong ? "opacity-100" : "opacity-10"}`}>{p}</span>
        ))}
      </div>

      <div className="font-display text-3xl tracking-[0.6em] text-cosmic py-2">{display}</div>

      {(won || lost) ? (
        <div className="text-center">
          <p className={`font-display text-sm mb-2 ${won ? "text-neon-green" : "text-neon-magenta"}`}>
            {won ? "YOU WIN!" : `GAME OVER — ${word}`}
          </p>
          <button onClick={newGame} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            NEW WORD
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => (
            <button
              key={l}
              onClick={() => guess(l)}
              disabled={guessed.has(l)}
              className={`w-8 h-8 rounded-lg font-display text-xs transition-all border-cosmic ${
                guessed.has(l)
                  ? word.includes(l) ? "glass text-neon-green opacity-50" : "glass text-neon-magenta opacity-30"
                  : "glass text-foreground hover:scale-110 active:scale-90"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hangman;
