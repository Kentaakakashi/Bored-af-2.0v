import { useState, useEffect, useCallback } from "react";

const TargetShoot = () => {
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [nextId, setNextId] = useState(0);

  const spawnTarget = useCallback(() => {
    const id = nextId;
    setNextId((n) => n + 1);
    const size = 30 + Math.random() * 30;
    setTargets((prev) => [
      ...prev,
      { id, x: 10 + Math.random() * 80, y: 10 + Math.random() * 80, size },
    ]);
    setTimeout(() => {
      setTargets((prev) => prev.filter((t) => t.id !== id));
    }, 1500);
  }, [nextId]);

  const start = useCallback(() => {
    setScore(0);
    setTimeLeft(15);
    setRunning(true);
    setResult(null);
    setTargets([]);
  }, []);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setResult(score);
      setTargets([]);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft, score]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(spawnTarget, 600);
    return () => clearInterval(interval);
  }, [running, spawnTarget]);

  const hit = (id: number) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-6">
        <div className="text-center">
          <div className="font-display text-xl text-primary glow-cyan">{running ? score : result ?? 0}</div>
          <div className="text-xs text-muted-foreground tracking-widest">HITS</div>
        </div>
        <div className="text-center">
          <div className="font-display text-xl text-neon-magenta">{timeLeft}s</div>
          <div className="text-xs text-muted-foreground tracking-widest">LEFT</div>
        </div>
      </div>

      <div className="relative w-full h-52 glass rounded-2xl border-cosmic overflow-hidden">
        {targets.map((t) => (
          <button
            key={t.id}
            onClick={() => hit(t.id)}
            className="absolute transition-all hover:scale-125"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              width: t.size,
              height: t.size,
              animation: "scale-in 0.2s ease-out",
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(0 84% 60%), hsl(0 84% 40%))",
                boxShadow: "0 0 15px hsl(0 84% 60% / 0.5)",
              }}
            />
          </button>
        ))}
        {!running && result === null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button onClick={start} className="glass rounded-xl px-6 py-3 font-display text-sm tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
              START SHOOTING
            </button>
          </div>
        )}
      </div>

      {result !== null && (
        <div className="text-center">
          <p className="text-neon-green font-display text-sm mb-2">{result} targets hit!</p>
          <button onClick={start} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
};

export default TargetShoot;
