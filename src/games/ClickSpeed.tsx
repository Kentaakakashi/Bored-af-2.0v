import { useState, useEffect, useCallback } from "react";

const ClickSpeed = () => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setResult(clicks);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [running, timeLeft, clicks]);

  const handleClick = () => {
    if (!running && result === null) {
      setRunning(true);
      setClicks(1);
      setTimeLeft(10);
      return;
    }
    if (running) setClicks((c) => c + 1);
  };

  const reset = useCallback(() => {
    setClicks(0);
    setTimeLeft(10);
    setRunning(false);
    setResult(null);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <div className="text-center">
          <div className="font-display text-2xl text-primary glow-cyan">{running ? clicks : result ?? 0}</div>
          <div className="text-xs text-muted-foreground tracking-widest">CLICKS</div>
        </div>
        <div className="text-center">
          <div className="font-display text-2xl text-neon-magenta">{timeLeft}s</div>
          <div className="text-xs text-muted-foreground tracking-widest">LEFT</div>
        </div>
      </div>

      {result !== null ? (
        <div className="text-center">
          <p className="text-neon-green glow-cyan font-display text-sm mb-3">
            {result / 10} clicks/sec!
          </p>
          <button onClick={reset} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            TRY AGAIN
          </button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="w-full h-40 glass rounded-2xl font-display font-bold tracking-wider text-foreground transition-all hover:scale-[1.02] active:scale-95 border-cosmic"
          style={{
            boxShadow: running ? `0 0 ${Math.min(clicks * 2, 60)}px hsl(190 100% 50% / ${Math.min(clicks * 0.02, 0.5)})` : undefined,
          }}
        >
          {running ? "KEEP CLICKING!" : "TAP TO START"}
        </button>
      )}
    </div>
  );
};

export default ClickSpeed;
