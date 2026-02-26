import { useEffect, useState } from "react";

const HeroSection = () => {
  const [count, setCount] = useState(0);
  const targetCount = 127;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetCount / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 pt-20 pb-10">
      {/* Nebula glow behind title */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(190 100% 50% / 0.4), hsl(320 100% 60% / 0.2), transparent)",
          animation: "nebula-breathe 8s ease-in-out infinite",
        }}
      />

      <div className="relative">
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-cosmic text-center tracking-tight leading-none"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          BOREDOM
          <br />
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.3em] opacity-80">
            DESTROYER
          </span>
        </h1>

        {/* Electric outline effect */}
        <div
          className="absolute inset-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-center tracking-tight leading-none pointer-events-none select-none"
          style={{
            WebkitTextStroke: "1px hsl(190 100% 50% / 0.3)",
            color: "transparent",
            filter: "blur(2px)",
            animation: "float 6s ease-in-out infinite 0.1s",
          }}
        >
          BOREDOM
          <br />
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.3em]">
            DESTROYER
          </span>
        </div>
      </div>

      <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg text-center font-body" style={{ animation: "fade-in 1s ease-out 0.5s both" }}>
        <span className="text-cosmic font-bold font-display text-2xl sm:text-3xl">{count}</span>{" "}
        games to obliterate boredom from existence
      </p>

      {/* Stats bar */}
      <div className="mt-10 flex gap-6 sm:gap-10 flex-wrap justify-center" style={{ animation: "fade-in 1s ease-out 1s both" }}>
        {[
          { label: "GAMES", value: "127", color: "neon-cyan" },
          { label: "PLAYERS", value: "∞", color: "neon-magenta" },
          { label: "FUN LEVEL", value: "MAX", color: "neon-purple" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl px-5 py-3 text-center border-cosmic">
            <div className={`font-display font-bold text-xl text-${stat.color} glow-cyan`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
