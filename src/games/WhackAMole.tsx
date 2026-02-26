import { useState, useEffect, useRef, useCallback } from "react";

const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [moleIndex, setMoleIndex] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(15);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const moleTimer = useRef<NodeJS.Timeout>();

  const spawnMole = useCallback(() => {
    setMoleIndex(Math.floor(Math.random() * 9));
    moleTimer.current = setTimeout(() => {
      setMoleIndex(-1);
      if (running) setTimeout(spawnMole, 200 + Math.random() * 400);
    }, 600 + Math.random() * 400);
  }, [running]);

  const start = useCallback(() => {
    setScore(0);
    setTimeLeft(15);
    setRunning(true);
    setResult(null);
    spawnMole();
  }, [spawnMole]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setResult(score);
      setMoleIndex(-1);
      clearTimeout(moleTimer.current);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft, score]);

  useEffect(() => {
    return () => clearTimeout(moleTimer.current);
  }, []);

  const whack = (i: number) => {
    if (i === moleIndex) {
      setScore((s) => s + 1);
      setMoleIndex(-1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <div className="text-center">
          <div className="font-display text-xl text-primary glow-cyan">{running ? score : result ?? 0}</div>
          <div className="text-xs text-muted-foreground tracking-widest">SCORE</div>
        </div>
        <div className="text-center">
          <div className="font-display text-xl text-neon-magenta">{timeLeft}s</div>
          <div className="text-xs text-muted-foreground tracking-widest">LEFT</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i}
            onClick={() => whack(i)}
            className={`w-20 h-20 rounded-2xl transition-all duration-150 active:scale-90 glass border-cosmic ${
              i === moleIndex ? "scale-110" : ""
            }`}
            style={{
              backgroundColor: i === moleIndex ? "hsl(25 100% 55%)" : undefined,
              boxShadow: i === moleIndex ? "0 0 25px hsl(25 100% 55% / 0.5)" : undefined,
            }}
          >
            {i === moleIndex ? "🐹" : ""}
          </button>
        ))}
      </div>

      {!running && result === null && (
        <button onClick={start} className="glass rounded-xl px-6 py-3 font-display text-sm tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
          START WHACKING
        </button>
      )}
      {result !== null && (
        <div className="text-center">
          <p className="text-neon-green font-display text-sm mb-2">Whacked {result} moles!</p>
          <button onClick={start} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
};

export default WhackAMole;
