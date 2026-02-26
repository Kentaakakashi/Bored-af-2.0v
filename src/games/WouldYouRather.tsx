import { useState } from "react";

const WouldYouRather = () => {
  const QUESTIONS = [
    { a: "Have the ability to fly", b: "Be invisible" },
    { a: "Live in space", b: "Live underwater" },
    { a: "Know every language", b: "Play every instrument" },
    { a: "Travel to the past", b: "Travel to the future" },
    { a: "Have super strength", b: "Have super speed" },
    { a: "Never sleep again", b: "Never eat again" },
    { a: "Read minds", b: "Control time" },
    { a: "Be a genius", b: "Be incredibly lucky" },
    { a: "Explore deep space", b: "Explore deep ocean" },
    { a: "Have unlimited money", b: "Have unlimited knowledge" },
  ];

  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<"a" | "b" | null>(null);
  const [stats, setStats] = useState<Record<number, { a: number; b: number }>>({});

  const current = QUESTIONS[index % QUESTIONS.length];

  const choose = (side: "a" | "b") => {
    setChosen(side);
    setStats((prev) => ({
      ...prev,
      [index]: {
        a: (prev[index]?.a || Math.floor(Math.random() * 50) + 25) + (side === "a" ? 1 : 0),
        b: (prev[index]?.b || Math.floor(Math.random() * 50) + 25) + (side === "b" ? 1 : 0),
      },
    }));
  };

  const next = () => {
    setIndex((i) => i + 1);
    setChosen(null);
  };

  const currentStats = stats[index];
  const total = currentStats ? currentStats.a + currentStats.b : 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-display text-xs text-muted-foreground tracking-widest">WOULD YOU RATHER...</p>

      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => !chosen && choose("a")}
          className={`glass rounded-xl p-4 text-sm text-left transition-all border-cosmic ${
            chosen === "a" ? "box-glow-cyan" : chosen ? "opacity-50" : "hover:scale-[1.02]"
          }`}
        >
          <span className="text-primary font-display text-xs mr-2">A</span> {current.a}
          {chosen && currentStats && (
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(240 10% 15%)" }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(currentStats.a / total) * 100}%`, background: "hsl(190 100% 50%)" }} />
            </div>
          )}
        </button>

        <div className="text-center font-display text-xs text-muted-foreground">OR</div>

        <button
          onClick={() => !chosen && choose("b")}
          className={`glass rounded-xl p-4 text-sm text-left transition-all border-cosmic ${
            chosen === "b" ? "box-glow-magenta" : chosen ? "opacity-50" : "hover:scale-[1.02]"
          }`}
        >
          <span className="text-neon-magenta font-display text-xs mr-2">B</span> {current.b}
          {chosen && currentStats && (
            <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(240 10% 15%)" }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(currentStats.b / total) * 100}%`, background: "hsl(320 100% 60%)" }} />
            </div>
          )}
        </button>
      </div>

      {chosen && (
        <button onClick={next} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic" style={{ animation: "fade-in 0.3s ease-out" }}>
          NEXT QUESTION
        </button>
      )}
    </div>
  );
};

export default WouldYouRather;
