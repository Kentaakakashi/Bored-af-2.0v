import { useState } from "react";

const DiceRoller = () => {
  const [dice, setDice] = useState([1, 1]);
  const [rolling, setRolling] = useState(false);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  const roll = () => {
    if (rolling) return;
    setRolling(true);

    let count = 0;
    const interval = setInterval(() => {
      setDice([Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        const d1 = Math.ceil(Math.random() * 6);
        const d2 = Math.ceil(Math.random() * 6);
        setDice([d1, d2]);
        const t = d1 + d2;
        setTotal(t);
        setHistory((h) => [t, ...h.slice(0, 9)]);
        setRolling(false);
      }
    }, 80);
  };

  const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-4">
        {dice.map((d, i) => (
          <div
            key={i}
            className={`w-24 h-24 glass rounded-2xl border-cosmic flex items-center justify-center text-5xl transition-all ${
              rolling ? "animate-icon-bounce" : ""
            }`}
          >
            {faces[d - 1]}
          </div>
        ))}
      </div>

      {total > 0 && !rolling && (
        <p className="font-display text-2xl text-cosmic glow-cyan" style={{ animation: "scale-in 0.3s ease-out" }}>
          {total}
        </p>
      )}

      <button
        onClick={roll}
        disabled={rolling}
        className="glass rounded-xl px-8 py-3 font-display text-sm tracking-wider text-primary hover:scale-105 transition-all border-cosmic disabled:opacity-50"
      >
        {rolling ? "ROLLING..." : "ROLL DICE"}
      </button>

      {history.length > 0 && (
        <div className="flex gap-2 flex-wrap justify-center">
          {history.map((h, i) => (
            <span key={i} className="glass rounded-lg px-2 py-1 text-xs font-display text-muted-foreground" style={{ opacity: 1 - i * 0.08 }}>
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
