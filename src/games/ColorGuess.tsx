import { useState, useEffect, useCallback } from "react";

const COLORS = [
  { name: "Cyan", hsl: "190 100% 50%" },
  { name: "Magenta", hsl: "320 100% 60%" },
  { name: "Purple", hsl: "280 100% 65%" },
  { name: "Orange", hsl: "25 100% 55%" },
  { name: "Green", hsl: "150 100% 50%" },
  { name: "Yellow", hsl: "50 100% 55%" },
];

const ColorGuess = () => {
  const [target, setTarget] = useState(COLORS[0]);
  const [options, setOptions] = useState<typeof COLORS>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const newRound = useCallback(() => {
    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    const picked = shuffled[0];
    const opts = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);
    if (!opts.includes(picked)) opts[0] = picked;
    setTarget(picked);
    setOptions(opts.sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, []);

  useEffect(() => { newRound(); }, [newRound]);

  const guess = (color: typeof COLORS[0]) => {
    if (color.name === target.name) {
      setScore((s) => s + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
    setTimeout(newRound, 800);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-display text-sm text-muted-foreground tracking-wider">
        SCORE: <span className="text-primary glow-cyan">{score}</span>
      </p>
      <div
        className="w-32 h-32 rounded-2xl border-cosmic transition-colors duration-300"
        style={{ backgroundColor: `hsl(${target.hsl})`, boxShadow: `0 0 40px hsl(${target.hsl} / 0.4)` }}
      />
      <p className="text-sm text-muted-foreground">What color is this?</p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {options.map((color) => (
          <button
            key={color.name}
            onClick={() => guess(color)}
            className={`glass rounded-xl px-4 py-3 font-display text-xs tracking-wider transition-all hover:scale-105 active:scale-95 border-cosmic ${
              feedback === "correct" && color.name === target.name ? "box-glow-cyan" : ""
            } ${feedback === "wrong" && color.name === target.name ? "box-glow-magenta" : ""}`}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorGuess;
