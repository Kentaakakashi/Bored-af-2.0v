import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (b: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b2, c] of lines) {
      if (b[a] && b[a] === b[b2] && b[a] === b[c]) return b[a];
    }
    return b.every(Boolean) ? "Draw" : null;
  };

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isX ? "X" : "O";
    setBoard(newBoard);
    setIsX(!isX);
    setWinner(checkWinner(newBoard));
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">
        {winner ? (winner === "Draw" ? "It's a draw!" : `${winner} wins!`) : `${isX ? "X" : "O"}'s turn`}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="glass w-20 h-20 rounded-xl font-display text-2xl font-bold transition-all hover:scale-105 active:scale-95 border-cosmic"
            style={{
              color: cell === "X" ? "hsl(190 100% 50%)" : "hsl(320 100% 60%)",
              textShadow: cell ? `0 0 15px ${cell === "X" ? "hsl(190 100% 50% / 0.5)" : "hsl(320 100% 60% / 0.5)"}` : "none",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <button onClick={reset} className="glass rounded-xl px-6 py-2 font-display text-sm tracking-wider text-primary hover:scale-105 transition-all border-cosmic">
          PLAY AGAIN
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
