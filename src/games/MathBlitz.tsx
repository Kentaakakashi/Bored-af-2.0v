import { useState, useEffect, useCallback } from "react";

const MathBlitz = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [op, setOp] = useState("+");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const generateProblem = useCallback(() => {
    const ops = ["+", "-", "×"];
    const o = ops[Math.floor(Math.random() * ops.length)];
    const na = Math.floor(Math.random() * 20) + 1;
    const nb = Math.floor(Math.random() * 20) + 1;
    setA(na);
    setB(nb);
    setOp(o);
    setAnswer("");
  }, []);

  const getCorrectAnswer = () => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      default: return 0;
    }
  };

  const start = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setRunning(true);
    setResult(null);
    generateProblem();
  }, [generateProblem]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setResult(score);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft, score]);

  const checkAnswer = () => {
    if (parseInt(answer) === getCorrectAnswer()) {
      setScore((s) => s + 1);
      generateProblem();
    } else {
      setAnswer("");
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

      {running ? (
        <>
          <div className="font-display text-4xl text-cosmic py-4">
            {a} {op} {b}
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
              className="glass rounded-xl px-4 py-2 w-28 text-center font-display text-foreground border-cosmic bg-transparent outline-none focus:box-glow-cyan"
              autoFocus
            />
            <button onClick={checkAnswer} className="glass rounded-xl px-4 py-2 font-display text-xs text-primary hover:scale-105 transition-all border-cosmic">
              ✓
            </button>
          </div>
        </>
      ) : result !== null ? (
        <div className="text-center">
          <p className="text-neon-green font-display text-lg mb-2">{result} correct!</p>
          <button onClick={start} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            PLAY AGAIN
          </button>
        </div>
      ) : (
        <button onClick={start} className="glass rounded-xl px-6 py-3 font-display text-sm tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
          START BLITZ
        </button>
      )}
    </div>
  );
};

export default MathBlitz;
