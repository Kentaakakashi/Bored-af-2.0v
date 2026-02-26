import { useState, useEffect, useCallback } from "react";

const PatternMatch = () => {
  const EMOJIS = ["🔴", "🔵", "🟢", "🟡", "🟣", "🟠"];
  const [pattern, setPattern] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const newRound = useCallback(() => {
    const base = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    const base2 = EMOJIS.filter((e) => e !== base)[Math.floor(Math.random() * 5)];
    // Create a repeating pattern
    const seq = [base, base2, base, base2, base];
    const correct = base2; // next in pattern
    const wrong1 = EMOJIS.filter((e) => e !== correct)[0];
    const wrong2 = EMOJIS.filter((e) => e !== correct)[1];
    const wrong3 = EMOJIS.filter((e) => e !== correct)[2];
    setPattern(seq);
    setAnswer(correct);
    setOptions([correct, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5));
    setFeedback(null);
  }, []);

  useEffect(() => { newRound(); }, [newRound]);

  const guess = (opt: string) => {
    const correct = opt === answer;
    setFeedback(correct);
    if (correct) setScore((s) => s + 1);
    setTimeout(newRound, 800);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        SCORE: <span className="text-primary glow-cyan">{score}</span>
      </p>

      <div className="flex items-center gap-2">
        {pattern.map((p, i) => (
          <span key={i} className="text-2xl" style={{ animation: `fade-in 0.3s ease-out ${i * 100}ms both` }}>{p}</span>
        ))}
        <span className="text-2xl animate-pulse-glow">❓</span>
      </div>

      <p className="text-xs text-muted-foreground">What comes next?</p>

      {feedback !== null && (
        <p className={`font-display text-sm ${feedback ? "text-neon-green" : "text-neon-magenta"}`}>
          {feedback ? "CORRECT!" : "NOPE!"}
        </p>
      )}

      <div className="flex gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => feedback === null && guess(opt)}
            className="w-14 h-14 glass rounded-xl text-2xl transition-all hover:scale-110 active:scale-90 border-cosmic"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatternMatch;
