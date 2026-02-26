import { useEffect, useState } from "react";
import AmbientVisualizer from "./AmbientVisualizer";

const HeroSection = () => {
  const [count, setCount] = useState(0);
  const targetCount = 24;

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
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[75vh] px-4 pt-20 pb-10">
      {/* Multiple nebula glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-25 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsl(190 100% 50% / 0.5), hsl(320 100% 60% / 0.3), transparent)",
          animation: "nebula-breathe 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(280 100% 65% / 0.5), transparent)",
          animation: "nebula-breathe 12s ease-in-out 2s infinite",
        }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full opacity-15 blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(25 100% 55% / 0.4), transparent)",
          animation: "nebula-breathe 10s ease-in-out 4s infinite",
        }}
      />

      {/* Floating decorative orbs */}
      {[
        { size: 6, top: "15%", left: "10%", delay: "0s", hue: 190 },
        { size: 4, top: "25%", right: "15%", delay: "1s", hue: 320 },
        { size: 8, bottom: "20%", left: "20%", delay: "2s", hue: 280 },
        { size: 5, top: "40%", right: "10%", delay: "3s", hue: 150 },
        { size: 3, top: "60%", left: "5%", delay: "1.5s", hue: 50 },
      ].map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: (orb as any).right,
            bottom: (orb as any).bottom,
            background: `hsl(${orb.hue} 100% 60%)`,
            boxShadow: `0 0 ${orb.size * 3}px hsl(${orb.hue} 100% 60% / 0.5)`,
            animation: `orb-float 8s ease-in-out ${orb.delay} infinite, twinkle 3s ease-in-out ${orb.delay} infinite`,
          }}
        />
      ))}

      <div className="relative">
        {/* Shadow text layer for 3D depth */}
        <div
          className="absolute inset-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-center tracking-tight leading-none pointer-events-none select-none opacity-20 blur-[4px]"
          style={{
            color: "hsl(190 100% 50%)",
            transform: "translate(3px, 3px)",
          }}
        >
          BOREDOM
          <br />
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.3em]">DESTROYER</span>
        </div>

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
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.3em]">DESTROYER</span>
        </div>
      </div>

      {/* Tagline */}
      <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg text-center font-body" style={{ animation: "fade-in 1s ease-out 0.5s both" }}>
        <span className="text-cosmic font-bold font-display text-2xl sm:text-3xl">{count}</span>{" "}
        games to obliterate boredom from existence
      </p>

      {/* Ambient visualizer */}
      <div className="mt-6 w-48 opacity-60" style={{ animation: "fade-in 1s ease-out 0.8s both" }}>
        <AmbientVisualizer />
      </div>

      {/* Stats bar */}
      <div className="mt-8 flex gap-4 sm:gap-8 flex-wrap justify-center" style={{ animation: "fade-in 1s ease-out 1s both" }}>
        {[
          { label: "GAMES", value: "24", color: "neon-cyan", glow: "glow-cyan" },
          { label: "CATEGORIES", value: "4", color: "neon-magenta", glow: "glow-magenta" },
          { label: "FUN LEVEL", value: "∞", color: "neon-purple", glow: "glow-cyan" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl px-5 py-3 text-center border-cosmic group hover:scale-105 transition-all cursor-default">
            <div className={`font-display font-bold text-xl text-${stat.color} ${stat.glow}`}>
              {stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
