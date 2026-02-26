import { useState, useCallback } from "react";

const WORDS = [
  "COSMIC", "NEBULA", "GALAXY", "QUASAR", "PULSAR", "STELLAR",
  "PHOTON", "PLASMA", "VORTEX", "CIPHER", "QUANTUM", "MATRIX",
];

const WordScramble = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const scramble = useCallback((word: string) => {
    return word.split("").sort(() => Math.random() - 0.5).join("");
  }, []);

  const [scrambled, setScrambled] = useState(scramble(WORDS[0]));

  const checkGuess = () => {
    if (guess.toUpperCase() === WORDS[wordIndex]) {
      setScore((s) => s + 1);
      setFeedback("✨ Correct!");
      setTimeout(() => {
        const next = (wordIndex + 1) % WORDS.length;
        setWordIndex(next);
        setScrambled(scramble(WORDS[next]));
        setGuess("");
        setFeedback(null);
      }, 800);
    } else {
      setFeedback("Try again!");
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const skip = () => {
    const next = (wordIndex + 1) % WORDS.length;
    setWordIndex(next);
    setScrambled(scramble(WORDS[next]));
    setGuess("");
    setFeedback(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        SCORE: <span className="text-primary glow-cyan">{score}</span>
      </p>
      <div className="font-display text-3xl tracking-[0.5em] text-cosmic py-4">
        {scrambled}
      </div>
      {feedback && <p className="text-sm text-neon-green">{feedback}</p>}
      <div className="flex gap-2 w-full max-w-xs">
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && checkGuess()}
          className="glass rounded-xl px-4 py-2 flex-1 text-center font-display text-foreground border-cosmic bg-transparent outline-none focus:box-glow-cyan tracking-widest"
          placeholder="ANSWER"
          maxLength={10}
        />
        <button onClick={checkGuess} className="glass rounded-xl px-4 py-2 font-display text-xs text-primary hover:scale-105 transition-all border-cosmic">
          ✓
        </button>
      </div>
      <button onClick={skip} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
        Skip →
      </button>
    </div>
  );
};

export default WordScramble;
