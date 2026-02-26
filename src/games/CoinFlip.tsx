import { useState } from "react";

const CoinFlip = () => {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setResult(null);
    setTimeout(() => {
      const r = Math.random() > 0.5 ? "heads" : "tails";
      setResult(r);
      setStats((s) => ({ ...s, [r]: s[r] + 1 }));
      setFlipping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-6">
        <div className="text-center">
          <div className="font-display text-lg text-primary glow-cyan">{stats.heads}</div>
          <div className="text-xs text-muted-foreground tracking-widest">HEADS</div>
        </div>
        <div className="text-center">
          <div className="font-display text-lg text-neon-magenta">{stats.tails}</div>
          <div className="text-xs text-muted-foreground tracking-widest">TAILS</div>
        </div>
      </div>

      <div
        className={`w-32 h-32 rounded-full glass border-cosmic flex items-center justify-center text-5xl transition-all duration-500 ${
          flipping ? "animate-spin" : ""
        }`}
        style={{
          boxShadow: result
            ? result === "heads"
              ? "0 0 40px hsl(50 100% 55% / 0.4)"
              : "0 0 40px hsl(190 100% 50% / 0.4)"
            : undefined,
        }}
      >
        {flipping ? "🌀" : result === "heads" ? "👑" : result === "tails" ? "🌙" : "🪙"}
      </div>

      {result && !flipping && (
        <p className="font-display text-sm text-cosmic tracking-wider" style={{ animation: "scale-in 0.3s ease-out" }}>
          {result.toUpperCase()}!
        </p>
      )}

      <button
        onClick={flip}
        disabled={flipping}
        className="glass rounded-xl px-8 py-3 font-display text-sm tracking-wider text-primary hover:scale-105 transition-all border-cosmic disabled:opacity-50"
      >
        {flipping ? "FLIPPING..." : "FLIP"}
      </button>
    </div>
  );
};

export default CoinFlip;
