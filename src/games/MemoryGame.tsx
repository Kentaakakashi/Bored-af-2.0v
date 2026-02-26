import { useState, useCallback, useEffect } from "react";

const EMOJIS = ["🌟", "🎮", "🚀", "🔮", "⚡", "🎯", "💎", "🌈"];

const MemoryGame = () => {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = useCallback(() => {
    const pairs = EMOJIS.slice(0, 6);
    const deck = [...pairs, ...pairs]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(deck);
    setFlippedIds([]);
    setMoves(0);
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const flipCard = (id: number) => {
    if (flippedIds.length >= 2) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;

    const newCards = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (newCards[a].emoji === newCards[b].emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c))
          );
          setFlippedIds([]);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c))
          );
          setFlippedIds([]);
        }, 800);
      }
    }
  };

  const allMatched = cards.length > 0 && cards.every((c) => c.matched);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-display text-xs text-muted-foreground tracking-wider">
        MOVES: <span className="text-primary glow-cyan">{moves}</span>
      </p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => flipCard(card.id)}
            className={`w-16 h-16 rounded-xl font-display text-xl transition-all duration-300 ${
              card.flipped || card.matched
                ? "glass box-glow-cyan scale-100"
                : "glass hover:scale-105 active:scale-95"
            } ${card.matched ? "opacity-60" : ""} border-cosmic`}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>
      {allMatched && (
        <div className="text-center">
          <p className="text-neon-green glow-cyan font-display text-sm mb-2">YOU WIN!</p>
          <button onClick={initGame} className="glass rounded-xl px-6 py-2 font-display text-xs tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
