import { useState } from "react";

const MagicBall = () => {
  const ANSWERS = [
    "It is certain ✨", "Without a doubt 🌟", "Yes definitely 💫",
    "Reply hazy, try again 🌫️", "Ask again later ⏳", "Cannot predict now 🔮",
    "Don't count on it 🌙", "My sources say no 💀", "Very doubtful 👻",
    "Outlook not so good ☁️", "Signs point to yes ⚡", "Most likely 🎯",
    "Better not tell you now 🤫", "Concentrate and ask again 🧘",
  ];

  const [answer, setAnswer] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [question, setQuestion] = useState("");

  const shake = () => {
    if (!question.trim()) return;
    setShaking(true);
    setAnswer(null);
    setTimeout(() => {
      setAnswer(ANSWERS[Math.floor(Math.random() * ANSWERS.length)]);
      setShaking(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && shake()}
        placeholder="Ask a yes/no question..."
        className="glass rounded-xl px-4 py-3 w-full text-sm font-body text-foreground border-cosmic bg-transparent outline-none focus:box-glow-cyan text-center"
      />

      <div
        className={`w-36 h-36 rounded-full flex items-center justify-center text-center transition-all duration-500 ${shaking ? "animate-icon-bounce" : ""}`}
        style={{
          background: "radial-gradient(circle, hsl(280 40% 15%), hsl(240 15% 5%))",
          boxShadow: "0 0 40px hsl(280 100% 65% / 0.2), inset 0 0 30px hsl(280 100% 65% / 0.1)",
        }}
      >
        {shaking ? (
          <span className="text-3xl animate-spin">🔮</span>
        ) : answer ? (
          <p className="text-xs font-display text-cosmic px-4 leading-relaxed" style={{ animation: "fade-in 0.5s ease-out" }}>{answer}</p>
        ) : (
          <span className="text-4xl">🎱</span>
        )}
      </div>

      <button
        onClick={shake}
        disabled={shaking || !question.trim()}
        className="glass rounded-xl px-8 py-3 font-display text-sm tracking-wider text-primary hover:scale-105 transition-all border-cosmic disabled:opacity-50"
      >
        {shaking ? "CONSULTING..." : "SHAKE"}
      </button>
    </div>
  );
};

export default MagicBall;
