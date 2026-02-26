import { useState, useEffect, useCallback } from "react";

const TypingSpeed = () => {
  const SENTENCES = [
    "the cosmic void whispers ancient secrets",
    "neon lights pulse through digital veins",
    "quantum particles dance in the void",
    "galaxies spiral into infinite beauty",
    "electric dreams illuminate the darkness",
  ];

  const [sentence, setSentence] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const newSentence = useCallback(() => {
    setSentence(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
    setInput("");
    setWpm(null);
    setRunning(false);
  }, []);

  useEffect(() => { newSentence(); }, [newSentence]);

  const handleInput = (val: string) => {
    if (!running) {
      setRunning(true);
      setStartTime(Date.now());
    }
    setInput(val);

    if (val === sentence) {
      const elapsed = (Date.now() - startTime) / 1000 / 60;
      const words = sentence.split(" ").length;
      setWpm(Math.round(words / elapsed));
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="font-body text-sm leading-relaxed text-center p-4 glass rounded-xl border-cosmic w-full">
        {sentence.split("").map((char, i) => (
          <span
            key={i}
            style={{
              color: i < input.length
                ? input[i] === char
                  ? "hsl(150 100% 50%)"
                  : "hsl(0 84% 60%)"
                : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className="glass rounded-xl px-4 py-3 w-full font-body text-sm text-foreground border-cosmic bg-transparent outline-none focus:box-glow-cyan"
        placeholder="Start typing..."
        disabled={wpm !== null}
        autoFocus
      />

      {wpm !== null && (
        <div className="text-center" style={{ animation: "scale-in 0.3s ease-out" }}>
          <p className="text-neon-green font-display text-2xl glow-cyan">{wpm} WPM</p>
          <button onClick={newSentence} className="mt-2 glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            TRY AGAIN
          </button>
        </div>
      )}
    </div>
  );
};

export default TypingSpeed;
