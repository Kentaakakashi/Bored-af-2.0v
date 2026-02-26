import { useState, useEffect, useCallback } from "react";

const SimonSays = () => {
  const COLORS = [
    { id: 0, bg: "hsl(190 100% 50%)", dim: "hsl(190 100% 25%)" },
    { id: 1, bg: "hsl(320 100% 60%)", dim: "hsl(320 100% 30%)" },
    { id: 2, bg: "hsl(150 100% 50%)", dim: "hsl(150 100% 25%)" },
    { id: 3, bg: "hsl(50 100% 55%)", dim: "hsl(50 100% 28%)" },
  ];

  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const playSequence = useCallback(async (seq: number[]) => {
    setIsPlaying(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise((r) => setTimeout(r, 400));
      setActiveId(seq[i]);
      await new Promise((r) => setTimeout(r, 400));
      setActiveId(null);
    }
    setIsPlaying(false);
  }, []);

  const startGame = useCallback(() => {
    const first = [Math.floor(Math.random() * 4)];
    setSequence(first);
    setPlayerSeq([]);
    setGameOver(false);
    setScore(0);
    playSequence(first);
  }, [playSequence]);

  const handlePress = (id: number) => {
    if (isPlaying || gameOver) return;
    setActiveId(id);
    setTimeout(() => setActiveId(null), 200);

    const newPlayerSeq = [...playerSeq, id];
    setPlayerSeq(newPlayerSeq);

    const idx = newPlayerSeq.length - 1;
    if (newPlayerSeq[idx] !== sequence[idx]) {
      setGameOver(true);
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);
      const next = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(next);
      setPlayerSeq([]);
      setTimeout(() => playSequence(next), 800);
    }
  };

  useEffect(() => { startGame(); }, [startGame]);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        SCORE: <span className="text-primary glow-cyan">{score}</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        {COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => handlePress(color.id)}
            className="w-24 h-24 rounded-2xl transition-all duration-150 active:scale-90"
            style={{
              backgroundColor: activeId === color.id ? color.bg : color.dim,
              boxShadow: activeId === color.id ? `0 0 30px ${color.bg}` : "none",
            }}
          />
        ))}
      </div>
      {isPlaying && <p className="text-xs text-muted-foreground animate-pulse-glow">Watch the pattern...</p>}
      {gameOver && (
        <div className="text-center">
          <p className="text-neon-magenta font-display text-sm mb-2">Game Over!</p>
          <button onClick={startGame} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            RESTART
          </button>
        </div>
      )}
    </div>
  );
};

export default SimonSays;
