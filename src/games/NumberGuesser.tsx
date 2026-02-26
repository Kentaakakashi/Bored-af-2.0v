import { useState, useEffect, useCallback } from "react";

const NumberGuesser = () => {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [hint, setHint] = useState("Guess a number between 1 and 100");
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);

  const newGame = useCallback(() => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setHint("Guess a number between 1 and 100");
    setAttempts(0);
    setWon(false);
  }, []);

  useEffect(() => { newGame(); }, [newGame]);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return;
    setAttempts((a) => a + 1);
    if (num === target) {
      setHint(`🎉 Correct! Got it in ${attempts + 1} tries!`);
      setWon(true);
    } else if (num < target) {
      setHint("📈 Too low! Go higher");
    } else {
      setHint("📉 Too high! Go lower");
    }
    setGuess("");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        ATTEMPTS: <span className="text-primary glow-cyan">{attempts}</span>
      </p>
      <p className="text-sm text-center text-muted-foreground">{hint}</p>
      {!won && (
        <div className="flex gap-2">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            className="glass rounded-xl px-4 py-2 w-24 text-center font-display text-foreground border-cosmic bg-transparent outline-none focus:box-glow-cyan"
            placeholder="?"
            min={1}
            max={100}
          />
          <button
            onClick={handleGuess}
            className="glass rounded-xl px-4 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic"
          >
            GUESS
          </button>
        </div>
      )}
      {won && (
        <button onClick={newGame} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
          PLAY AGAIN
        </button>
      )}
    </div>
  );
};

export default NumberGuesser;
