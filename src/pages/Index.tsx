import { useState, lazy, Suspense } from "react";
import CosmicBackground from "@/components/CosmicBackground";
import HeroSection from "@/components/HeroSection";
import GameCard from "@/components/GameCard";
import GameModal from "@/components/GameModal";
import Footer from "@/components/Footer";

// Lazy load games
const TicTacToe = lazy(() => import("@/games/TicTacToe"));
const ColorGuess = lazy(() => import("@/games/ColorGuess"));
const ReactionTime = lazy(() => import("@/games/ReactionTime"));
const MemoryGame = lazy(() => import("@/games/MemoryGame"));
const NumberGuesser = lazy(() => import("@/games/NumberGuesser"));
const ClickSpeed = lazy(() => import("@/games/ClickSpeed"));
const SimonSays = lazy(() => import("@/games/SimonSays"));
const WordScramble = lazy(() => import("@/games/WordScramble"));
const WhackAMole = lazy(() => import("@/games/WhackAMole"));
const MathBlitz = lazy(() => import("@/games/MathBlitz"));
const RockPaperScissors = lazy(() => import("@/games/RockPaperScissors"));
const TypingSpeed = lazy(() => import("@/games/TypingSpeed"));

interface GameDef {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const GAMES: GameDef[] = [
  { id: "tictactoe", title: "TIC TAC TOE", icon: "❌", description: "Classic X vs O showdown", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(220 100% 60%))", component: TicTacToe },
  { id: "memory", title: "MEMORY", icon: "🧠", description: "Match the cosmic pairs", color: "neon-purple", gradient: "linear-gradient(135deg, hsl(280 100% 65%), hsl(320 100% 60%))", component: MemoryGame },
  { id: "reaction", title: "REACTION", icon: "⚡", description: "Test your reflexes", color: "neon-green", gradient: "linear-gradient(135deg, hsl(150 100% 50%), hsl(190 100% 50%))", component: ReactionTime },
  { id: "color", title: "COLOR GUESS", icon: "🎨", description: "Name that cosmic hue", color: "neon-magenta", gradient: "linear-gradient(135deg, hsl(320 100% 60%), hsl(25 100% 55%))", component: ColorGuess },
  { id: "number", title: "NUMBER HUNT", icon: "🔢", description: "Find the hidden number", color: "neon-orange", gradient: "linear-gradient(135deg, hsl(25 100% 55%), hsl(50 100% 55%))", component: NumberGuesser },
  { id: "click", title: "CLICK FRENZY", icon: "👆", description: "How fast can you tap?", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(150 100% 50%))", component: ClickSpeed },
  { id: "simon", title: "SIMON SAYS", icon: "🎵", description: "Remember the pattern", color: "neon-yellow", gradient: "linear-gradient(135deg, hsl(50 100% 55%), hsl(25 100% 55%))", component: SimonSays },
  { id: "scramble", title: "WORD SCRAMBLE", icon: "🔤", description: "Unscramble cosmic words", color: "neon-purple", gradient: "linear-gradient(135deg, hsl(280 100% 65%), hsl(190 100% 50%))", component: WordScramble },
  { id: "whack", title: "WHACK-A-MOLE", icon: "🐹", description: "Smash those critters!", color: "neon-orange", gradient: "linear-gradient(135deg, hsl(25 100% 55%), hsl(0 84% 60%))", component: WhackAMole },
  { id: "math", title: "MATH BLITZ", icon: "🧮", description: "Speed math challenge", color: "neon-green", gradient: "linear-gradient(135deg, hsl(150 100% 50%), hsl(50 100% 55%))", component: MathBlitz },
  { id: "rps", title: "ROCK PAPER SCISSORS", icon: "✊", description: "Beat the machine", color: "neon-magenta", gradient: "linear-gradient(135deg, hsl(320 100% 60%), hsl(280 100% 65%))", component: RockPaperScissors },
  { id: "typing", title: "TYPING SPEED", icon: "⌨️", description: "How fast can you type?", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(280 100% 65%))", component: TypingSpeed },
];

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-10">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [activeGame, setActiveGame] = useState<GameDef | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const categories = [
    { label: "ALL", value: null },
    { label: "BRAIN", value: "brain" },
    { label: "SPEED", value: "speed" },
    { label: "FUN", value: "fun" },
  ];

  const getCat = (id: string) => {
    if (["memory", "number", "scramble", "math"].includes(id)) return "brain";
    if (["reaction", "click", "typing", "whack"].includes(id)) return "speed";
    return "fun";
  };

  const filtered = filter ? GAMES.filter((g) => getCat(g.id) === filter) : GAMES;

  return (
    <div className="relative min-h-screen noise">
      <CosmicBackground />

      <HeroSection />

      {/* Category filters */}
      <section className="relative z-10 px-4 pb-4 flex justify-center gap-2" style={{ animation: "fade-in 0.6s ease-out 1.2s both" }}>
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setFilter(cat.value)}
            className={`glass rounded-full px-4 py-1.5 font-display text-xs tracking-widest transition-all hover:scale-105 ${
              filter === cat.value ? "box-glow-cyan text-primary" : "text-muted-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Games grid */}
      <section className="relative z-10 px-4 pb-10 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((game, i) => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={<span>{game.icon}</span>}
              description={game.description}
              color={game.color}
              gradient={game.gradient}
              onClick={() => setActiveGame(game)}
              delay={100 + i * 80}
            />
          ))}
        </div>

        {/* More games coming teaser */}
        <div className="mt-8 text-center" style={{ animation: "fade-in 0.6s ease-out 2s both" }}>
          <p className="text-muted-foreground text-sm">
            <span className="text-cosmic font-display">115 more games</span>{" "}
            coming soon...
          </p>
        </div>
      </section>

      {/* Game Modal */}
      {activeGame && (
        <GameModal
          isOpen={!!activeGame}
          onClose={() => setActiveGame(null)}
          title={activeGame.title}
          gradient={activeGame.gradient}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <activeGame.component />
          </Suspense>
        </GameModal>
      )}

      <Footer />
    </div>
  );
};

export default Index;
