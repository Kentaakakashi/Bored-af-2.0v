import { useState, lazy, Suspense } from "react";
import CosmicBackground from "@/components/CosmicBackground";
import HeroSection from "@/components/HeroSection";
import GameCard from "@/components/GameCard";
import GameModal from "@/components/GameModal";
import ActivityFeed from "@/components/ActivityFeed";
import Footer from "@/components/Footer";

// Lazy load all games
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
const CoinFlip = lazy(() => import("@/games/CoinFlip"));
const DiceRoller = lazy(() => import("@/games/DiceRoller"));
const Hangman = lazy(() => import("@/games/Hangman"));
const TriviaQuiz = lazy(() => import("@/games/TriviaQuiz"));
const EmojiMixer = lazy(() => import("@/games/EmojiMixer"));
const PatternMatch = lazy(() => import("@/games/PatternMatch"));
const MagicBall = lazy(() => import("@/games/MagicBall"));
const SpotDifference = lazy(() => import("@/games/SpotDifference"));
const TargetShoot = lazy(() => import("@/games/TargetShoot"));
const CountdownTimer = lazy(() => import("@/games/CountdownTimer"));
const TruthOrDare = lazy(() => import("@/games/TruthOrDare"));
const WouldYouRather = lazy(() => import("@/games/WouldYouRather"));
const PasswordGame = lazy(() => import("@/games/PasswordGame"));

interface GameDef {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  gradient: string;
  category: string;
  component: React.LazyExoticComponent<React.ComponentType>;
}

const GAMES: GameDef[] = [
  // Brain games
  { id: "memory", title: "MEMORY", icon: "🧠", description: "Match the cosmic pairs", color: "neon-purple", gradient: "linear-gradient(135deg, hsl(280 100% 65%), hsl(320 100% 60%))", category: "brain", component: MemoryGame },
  { id: "math", title: "MATH BLITZ", icon: "🧮", description: "Speed math challenge", color: "neon-green", gradient: "linear-gradient(135deg, hsl(150 100% 50%), hsl(50 100% 55%))", category: "brain", component: MathBlitz },
  { id: "scramble", title: "WORD SCRAMBLE", icon: "🔤", description: "Unscramble cosmic words", color: "neon-purple", gradient: "linear-gradient(135deg, hsl(280 100% 65%), hsl(190 100% 50%))", category: "brain", component: WordScramble },
  { id: "number", title: "NUMBER HUNT", icon: "🔢", description: "Find the hidden number", color: "neon-orange", gradient: "linear-gradient(135deg, hsl(25 100% 55%), hsl(50 100% 55%))", category: "brain", component: NumberGuesser },
  { id: "trivia", title: "TRIVIA QUIZ", icon: "📚", description: "Test your knowledge", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(220 100% 60%))", category: "brain", component: TriviaQuiz },
  { id: "pattern", title: "PATTERN MATCH", icon: "🔮", description: "What comes next?", color: "neon-magenta", gradient: "linear-gradient(135deg, hsl(320 100% 60%), hsl(280 100% 65%))", category: "brain", component: PatternMatch },
  { id: "hangman", title: "HANGMAN", icon: "💀", description: "Guess the cosmic word", color: "neon-orange", gradient: "linear-gradient(135deg, hsl(25 100% 55%), hsl(0 84% 60%))", category: "brain", component: Hangman },
  { id: "password", title: "PASSWORD GAME", icon: "🔐", description: "Craft the perfect password", color: "neon-green", gradient: "linear-gradient(135deg, hsl(150 100% 50%), hsl(190 100% 50%))", category: "brain", component: PasswordGame },
  
  // Speed games
  { id: "reaction", title: "REACTION", icon: "⚡", description: "Test your reflexes", color: "neon-green", gradient: "linear-gradient(135deg, hsl(150 100% 50%), hsl(190 100% 50%))", category: "speed", component: ReactionTime },
  { id: "click", title: "CLICK FRENZY", icon: "👆", description: "How fast can you tap?", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(150 100% 50%))", category: "speed", component: ClickSpeed },
  { id: "typing", title: "TYPING SPEED", icon: "⌨️", description: "How fast can you type?", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(280 100% 65%))", category: "speed", component: TypingSpeed },
  { id: "whack", title: "WHACK-A-MOLE", icon: "🐹", description: "Smash those critters!", color: "neon-orange", gradient: "linear-gradient(135deg, hsl(25 100% 55%), hsl(0 84% 60%))", category: "speed", component: WhackAMole },
  { id: "target", title: "TARGET SHOOT", icon: "🎯", description: "Hit the moving targets", color: "neon-magenta", gradient: "linear-gradient(135deg, hsl(320 100% 60%), hsl(0 84% 60%))", category: "speed", component: TargetShoot },
  { id: "spot", title: "SPOT THE ODD", icon: "👁️", description: "Find what doesn't belong", color: "neon-yellow", gradient: "linear-gradient(135deg, hsl(50 100% 55%), hsl(25 100% 55%))", category: "speed", component: SpotDifference },
  
  // Fun games
  { id: "tictactoe", title: "TIC TAC TOE", icon: "❌", description: "Classic X vs O showdown", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(220 100% 60%))", category: "fun", component: TicTacToe },
  { id: "rps", title: "ROCK PAPER SCISSORS", icon: "✊", description: "Beat the machine", color: "neon-magenta", gradient: "linear-gradient(135deg, hsl(320 100% 60%), hsl(280 100% 65%))", category: "fun", component: RockPaperScissors },
  { id: "simon", title: "SIMON SAYS", icon: "🎵", description: "Remember the pattern", color: "neon-yellow", gradient: "linear-gradient(135deg, hsl(50 100% 55%), hsl(25 100% 55%))", category: "fun", component: SimonSays },
  { id: "color", title: "COLOR GUESS", icon: "🎨", description: "Name that cosmic hue", color: "neon-magenta", gradient: "linear-gradient(135deg, hsl(320 100% 60%), hsl(25 100% 55%))", category: "fun", component: ColorGuess },
  { id: "emoji", title: "EMOJI MIXER", icon: "🧪", description: "What do they combine into?", color: "neon-purple", gradient: "linear-gradient(135deg, hsl(280 100% 65%), hsl(50 100% 55%))", category: "fun", component: EmojiMixer },
  
  // Chill games
  { id: "coin", title: "COIN FLIP", icon: "🪙", description: "Heads or tails?", color: "neon-yellow", gradient: "linear-gradient(135deg, hsl(50 100% 55%), hsl(190 100% 50%))", category: "chill", component: CoinFlip },
  { id: "dice", title: "DICE ROLLER", icon: "🎲", description: "Roll the cosmic dice", color: "neon-orange", gradient: "linear-gradient(135deg, hsl(25 100% 55%), hsl(320 100% 60%))", category: "chill", component: DiceRoller },
  { id: "magic", title: "MAGIC 8 BALL", icon: "🎱", description: "Ask the cosmos", color: "neon-purple", gradient: "linear-gradient(135deg, hsl(280 100% 65%), hsl(240 30% 20%))", category: "chill", component: MagicBall },
  { id: "truth", title: "TRUTH OR DARE", icon: "😈", description: "Choose your fate", color: "neon-magenta", gradient: "linear-gradient(135deg, hsl(320 100% 60%), hsl(190 100% 50%))", category: "chill", component: TruthOrDare },
  { id: "rather", title: "WOULD YOU RATHER", icon: "🤔", description: "Impossible choices", color: "neon-cyan", gradient: "linear-gradient(135deg, hsl(190 100% 50%), hsl(320 100% 60%))", category: "chill", component: WouldYouRather },
  { id: "timer", title: "COUNTDOWN", icon: "⏱️", description: "Cosmic timer", color: "neon-green", gradient: "linear-gradient(135deg, hsl(150 100% 50%), hsl(190 100% 50%))", category: "chill", component: CountdownTimer },
];

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
      <div className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full animate-spin" />
      <div className="absolute inset-2 border-2 border-transparent border-t-neon-magenta rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
    </div>
  </div>
);

const Index = () => {
  const [activeGame, setActiveGame] = useState<GameDef | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const categories = [
    { label: "ALL", value: null, icon: "🌌" },
    { label: "BRAIN", value: "brain", icon: "🧠" },
    { label: "SPEED", value: "speed", icon: "⚡" },
    { label: "FUN", value: "fun", icon: "🎮" },
    { label: "CHILL", value: "chill", icon: "✨" },
  ];

  const filtered = filter ? GAMES.filter((g) => g.category === filter) : GAMES;

  return (
    <div className="relative min-h-screen noise">
      <CosmicBackground />

      <HeroSection />

      {/* Category filters */}
      <section className="relative z-10 px-4 pb-6 flex justify-center gap-2 flex-wrap" style={{ animation: "fade-in 0.6s ease-out 1.2s both" }}>
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setFilter(cat.value)}
            className={`glass rounded-full px-4 py-2 font-display text-[10px] tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 ${
              filter === cat.value ? "box-glow-cyan text-primary" : "text-muted-foreground"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </section>

      {/* Activity Feed */}
      <section className="relative z-10 px-4 pb-6 max-w-md mx-auto" style={{ animation: "fade-in 0.6s ease-out 1.4s both" }}>
        <ActivityFeed />
      </section>

      {/* Games grid */}
      <section className="relative z-10 px-4 pb-10 max-w-6xl mx-auto">
        {/* Section title */}
        {filter && (
          <h2 className="font-display text-sm tracking-widest text-muted-foreground text-center mb-6" style={{ animation: "fade-in 0.3s ease-out" }}>
            {categories.find((c) => c.value === filter)?.icon}{" "}
            {categories.find((c) => c.value === filter)?.label} GAMES
            <span className="text-primary ml-2">({filtered.length})</span>
          </h2>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filtered.map((game, i) => (
            <GameCard
              key={game.id}
              title={game.title}
              icon={<span>{game.icon}</span>}
              description={game.description}
              color={game.color}
              gradient={game.gradient}
              onClick={() => setActiveGame(game)}
              delay={50 + i * 50}
            />
          ))}
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
