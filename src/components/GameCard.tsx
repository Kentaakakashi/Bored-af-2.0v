import { useState, type ReactNode } from "react";

interface GameCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  color: string;
  gradient: string;
  onClick: () => void;
  delay?: number;
}

const GameCard = ({ title, icon, description, gradient, onClick, delay = 0 }: GameCardProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className="group relative glass rounded-2xl p-6 text-left transition-all duration-500 hover:scale-[1.03] active:scale-95 border-cosmic overflow-hidden w-full"
      style={{
        animation: `fade-in 0.6s ease-out ${delay}ms both`,
        transform: isPressed ? "scale(0.95)" : undefined,
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
        style={{ background: gradient }}
      />

      {/* Shimmer effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "card-shimmer 2s ease-in-out infinite",
        }}
      />

      <div className="relative z-10">
        <div
          className="text-3xl mb-3 inline-block"
          style={{ animation: `icon-bounce 3s ease-in-out ${delay}ms infinite` }}
        >
          {icon}
        </div>
        <h3 className="font-display font-bold text-foreground text-sm tracking-wider mb-1">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Corner accent */}
      <div
        className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
        style={{ background: gradient }}
      />
    </button>
  );
};

export default GameCard;
