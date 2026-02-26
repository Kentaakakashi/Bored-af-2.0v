import { useState, useEffect, useCallback } from "react";

const SpotDifference = () => {
  const GRIDS = [
    { grid: ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍒", "🥝"], odd: 8, oddEmoji: "🥑" },
    { grid: ["😀", "😀", "😀", "😀", "😀", "😀", "😃", "😀", "😀"], odd: 6, oddEmoji: "😃" },
    { grid: ["🔵", "🔵", "🔵", "🔵", "🔹", "🔵", "🔵", "🔵", "🔵"], odd: 4, oddEmoji: "🔹" },
    { grid: ["⭐", "⭐", "⭐", "🌟", "⭐", "⭐", "⭐", "⭐", "⭐"], odd: 3, oddEmoji: "🌟" },
  ];

  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [running, setRunning] = useState(false);

  const current = GRIDS[level % GRIDS.length];

  const start = useCallback(() => {
    setRunning(true);
    setTimeLeft(5);
    setFeedback(null);
  }, []);

  useEffect(() => { start(); }, [start, level]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setFeedback(false);
      setTimeout(() => {
        setLevel((l) => l + 1);
      }, 1000);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  const tap = (i: number) => {
    if (!running) return;
    if (i === current.odd) {
      setFeedback(true);
      setScore((s) => s + 1);
      setRunning(false);
      setTimeout(() => setLevel((l) => l + 1), 800);
    } else {
      setFeedback(false);
      setRunning(false);
      setTimeout(() => setLevel((l) => l + 1), 800);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <div className="text-center">
          <div className="font-display text-lg text-primary glow-cyan">{score}</div>
          <div className="text-xs text-muted-foreground tracking-widest">SCORE</div>
        </div>
        <div className="text-center">
          <div className="font-display text-lg text-neon-magenta">{timeLeft}s</div>
          <div className="text-xs text-muted-foreground tracking-widest">LEFT</div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Find the odd one out!</p>

      {feedback !== null && (
        <p className={`font-display text-sm ${feedback ? "text-neon-green" : "text-neon-magenta"}`}>
          {feedback ? "FOUND IT!" : "MISSED!"}
        </p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {current.grid.map((emoji, i) => (
          <button
            key={i}
            onClick={() => tap(i)}
            className="w-16 h-16 glass rounded-xl text-2xl transition-all hover:scale-110 active:scale-90 border-cosmic"
          >
            {i === current.odd ? current.oddEmoji : emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpotDifference;
