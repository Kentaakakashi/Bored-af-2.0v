import { useEffect, useState } from "react";

const ACTIVITIES = [
  "🌟 Someone just beat the typing speed record!",
  "⚡ 3 players completed Simon Says level 10",
  "🎯 New whack-a-mole champion crowned",
  "🧠 Memory game solved in 8 moves!",
  "🔥 Click frenzy: 142 clicks in 10 seconds",
  "🎨 Color guess 20 streak achieved!",
  "✊ 50 Rock Paper Scissors wins in a row",
  "🧮 Math Blitz: 45 correct in 30 seconds",
  "🔤 Word scramble 15 streak!",
  "⏱️ Reaction time: 112ms — inhuman!",
  "🎱 Magic 8 Ball: 100 questions asked",
  "🪙 Coin flip: 20 heads in a row!",
];

const ActivityFeed = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % ACTIVITIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass rounded-2xl p-4 border-cosmic relative overflow-hidden scanlines">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse-glow" />
        <span className="font-display text-[10px] tracking-widest text-muted-foreground">LIVE FEED</span>
      </div>
      <p
        key={current}
        className="text-xs text-foreground/80"
        style={{ animation: "fade-in 0.5s ease-out" }}
      >
        {ACTIVITIES[current]}
      </p>
    </div>
  );
};

export default ActivityFeed;
