import { useState } from "react";

const RockPaperScissors = () => {
  const choices = ["🪨", "📄", "✂️"] as const;
  const names = ["Rock", "Paper", "Scissors"];
  const [playerChoice, setPlayerChoice] = useState<number | null>(null);
  const [cpuChoice, setCpuChoice] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState({ wins: 0, losses: 0 });

  const play = (choice: number) => {
    const cpu = Math.floor(Math.random() * 3);
    setPlayerChoice(choice);
    setCpuChoice(cpu);

    if (choice === cpu) {
      setResult("Draw!");
    } else if ((choice + 1) % 3 === cpu) {
      setResult("You lose!");
      setScore((s) => ({ ...s, losses: s.losses + 1 }));
    } else {
      setResult("You win!");
      setScore((s) => ({ ...s, wins: s.wins + 1 }));
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-4">
        <div className="text-center">
          <div className="font-display text-lg text-neon-green">{score.wins}</div>
          <div className="text-xs text-muted-foreground tracking-widest">WINS</div>
        </div>
        <div className="text-center">
          <div className="font-display text-lg text-neon-magenta">{score.losses}</div>
          <div className="text-xs text-muted-foreground tracking-widest">LOSSES</div>
        </div>
      </div>

      <div className="flex gap-3">
        {choices.map((emoji, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className={`w-20 h-20 rounded-2xl text-3xl glass transition-all hover:scale-110 active:scale-90 border-cosmic ${
              playerChoice === i ? "box-glow-cyan" : ""
            }`}
            title={names[i]}
          >
            {emoji}
          </button>
        ))}
      </div>

      {result && (
        <div className="text-center" style={{ animation: "scale-in 0.3s ease-out" }}>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-3xl">{playerChoice !== null ? choices[playerChoice] : ""}</span>
            <span className="text-muted-foreground font-display text-xs">VS</span>
            <span className="text-3xl">{cpuChoice !== null ? choices[cpuChoice] : ""}</span>
          </div>
          <p className={`font-display text-sm ${result.includes("win") ? "text-neon-green" : result.includes("lose") ? "text-neon-magenta" : "text-muted-foreground"}`}>
            {result}
          </p>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;
