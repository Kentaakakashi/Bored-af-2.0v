import { useState } from "react";

const TRIVIA = [
  { q: "What planet is known as the Red Planet?", a: "Mars", opts: ["Venus", "Mars", "Jupiter", "Saturn"] },
  { q: "How many bits in a byte?", a: "8", opts: ["4", "8", "16", "32"] },
  { q: "What is the speed of light (km/s)?", a: "300,000", opts: ["150,000", "300,000", "500,000", "1,000,000"] },
  { q: "Which element has symbol 'Au'?", a: "Gold", opts: ["Silver", "Gold", "Aluminum", "Argon"] },
  { q: "What is the largest ocean?", a: "Pacific", opts: ["Atlantic", "Pacific", "Indian", "Arctic"] },
  { q: "How many planets in our solar system?", a: "8", opts: ["7", "8", "9", "10"] },
  { q: "What gas do plants breathe in?", a: "CO₂", opts: ["O₂", "CO₂", "N₂", "H₂"] },
  { q: "What year did the moon landing happen?", a: "1969", opts: ["1965", "1969", "1971", "1973"] },
  { q: "What is the smallest prime number?", a: "2", opts: ["1", "2", "3", "5"] },
  { q: "How many hearts does an octopus have?", a: "3", opts: ["1", "2", "3", "4"] },
];

const TriviaQuiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const current = TRIVIA[index];

  const answer = (opt: string) => {
    setSelected(opt);
    if (opt === current.a) setScore((s) => s + 1);
    setTimeout(() => {
      if (index + 1 >= TRIVIA.length) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
      }
    }, 800);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setDone(false);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="font-display text-4xl text-cosmic">{score}/{TRIVIA.length}</div>
        <p className="text-sm text-muted-foreground">
          {score >= 8 ? "🌟 Genius!" : score >= 5 ? "👍 Nice!" : "📚 Keep learning!"}
        </p>
        <button onClick={restart} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
          PLAY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full text-xs text-muted-foreground font-display tracking-wider">
        <span>{index + 1}/{TRIVIA.length}</span>
        <span>SCORE: <span className="text-primary">{score}</span></span>
      </div>

      <p className="text-sm text-center text-foreground py-2">{current.q}</p>

      <div className="grid grid-cols-2 gap-2 w-full">
        {current.opts.map((opt) => (
          <button
            key={opt}
            onClick={() => !selected && answer(opt)}
            disabled={!!selected}
            className={`glass rounded-xl px-3 py-3 font-display text-xs tracking-wider transition-all border-cosmic ${
              selected === opt
                ? opt === current.a ? "box-glow-cyan text-neon-green" : "box-glow-magenta text-neon-magenta"
                : selected && opt === current.a ? "box-glow-cyan text-neon-green" : "text-foreground hover:scale-105"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TriviaQuiz;
