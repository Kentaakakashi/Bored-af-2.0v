import { useState } from "react";

const EmojiMixer = () => {
  const MIXES = [
    { emojis: ["🌊", "🔥"], answer: "💨", hint: "Steam", options: ["💨", "🌫️", "❄️", "⚡"] },
    { emojis: ["🌙", "🌞"], answer: "🌗", hint: "Eclipse", options: ["🌗", "⭐", "🌈", "☁️"] },
    { emojis: ["❄️", "☀️"], answer: "💧", hint: "Melt", options: ["🌊", "💧", "🌈", "🔥"] },
    { emojis: ["🌱", "⏰"], answer: "🌳", hint: "Growth", options: ["🌸", "🌳", "🍂", "🌿"] },
    { emojis: ["👑", "🦁"], answer: "🦁", hint: "King", options: ["🐯", "🦁", "👸", "🏰"] },
    { emojis: ["🎵", "💤"], answer: "🎶", hint: "Lullaby", options: ["🎸", "🎶", "🔔", "📯"] },
    { emojis: ["🌍", "🔭"], answer: "🪐", hint: "Discover", options: ["⭐", "🪐", "☄️", "🌌"] },
    { emojis: ["⚡", "🧪"], answer: "💡", hint: "Invention", options: ["💡", "🔋", "⚗️", "🧬"] },
  ];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const current = MIXES[index];

  const guess = (emoji: string) => {
    const correct = emoji === current.answer;
    setFeedback(correct);
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setIndex((i) => (i + 1) % MIXES.length);
      setFeedback(null);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        SCORE: <span className="text-primary glow-cyan">{score}</span>
      </p>

      <div className="flex items-center gap-3 text-4xl">
        <span style={{ animation: "icon-bounce 2s ease-in-out infinite" }}>{current.emojis[0]}</span>
        <span className="text-cosmic font-display text-lg">+</span>
        <span style={{ animation: "icon-bounce 2s ease-in-out 0.3s infinite" }}>{current.emojis[1]}</span>
        <span className="text-cosmic font-display text-lg">=</span>
        <span className="text-3xl">❓</span>
      </div>

      <p className="text-xs text-muted-foreground">Hint: {current.hint}</p>

      {feedback !== null && (
        <p className={`font-display text-sm ${feedback ? "text-neon-green" : "text-neon-magenta"}`} style={{ animation: "scale-in 0.2s ease-out" }}>
          {feedback ? "CORRECT!" : "NOPE!"}
        </p>
      )}

      <div className="grid grid-cols-4 gap-2">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => feedback === null && guess(opt)}
            className="w-16 h-16 glass rounded-xl text-2xl transition-all hover:scale-110 active:scale-90 border-cosmic"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiMixer;
