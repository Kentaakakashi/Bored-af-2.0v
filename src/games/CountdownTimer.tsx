import { useState, useEffect, useCallback } from "react";

const CountdownTimer = () => {
  const [inputMinutes, setInputMinutes] = useState("1");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!running || secondsLeft <= 0) {
      if (running && secondsLeft <= 0) {
        setRunning(false);
        setDone(true);
      }
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, secondsLeft]);

  const start = useCallback(() => {
    const mins = parseFloat(inputMinutes) || 1;
    setSecondsLeft(Math.floor(mins * 60));
    setRunning(true);
    setDone(false);
  }, [inputMinutes]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = running || done ? 0 : 1;
  const totalSecs = (parseFloat(inputMinutes) || 1) * 60;
  const pct = running ? secondsLeft / totalSecs : done ? 0 : 1;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(240 10% 15%)" strokeWidth="3" />
          <circle
            cx="50" cy="50" r="45" fill="none"
            stroke="url(#timerGrad)" strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${pct * 283} 283`}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(190 100% 50%)" />
              <stop offset="100%" stopColor="hsl(320 100% 60%)" />
            </linearGradient>
          </defs>
        </svg>
        <span className={`font-display text-3xl ${done ? "text-neon-magenta animate-pulse-glow" : "text-cosmic"}`}>
          {running ? formatTime(secondsLeft) : done ? "DONE!" : formatTime(Math.floor((parseFloat(inputMinutes) || 1) * 60))}
        </span>
      </div>

      {!running && !done && (
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            className="glass rounded-xl px-3 py-2 w-20 text-center font-display text-foreground border-cosmic bg-transparent outline-none focus:box-glow-cyan"
            min="0.1" max="60" step="0.5"
          />
          <span className="text-xs text-muted-foreground">min</span>
        </div>
      )}

      <div className="flex gap-2">
        {!running && (
          <button onClick={start} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            {done ? "RESTART" : "START"}
          </button>
        )}
        {running && (
          <button onClick={() => setRunning(false)} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-neon-magenta hover:scale-105 transition-all border-cosmic">
            STOP
          </button>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
