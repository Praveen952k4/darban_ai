import React, { useEffect, useState } from "react";
import { useGame } from "./GameContext";
import confetti from "canvas-confetti";

const WinnerDialog = () => {
  const { state, newRound, restartGame } = useGame();
  const { status, winner } = state;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "won" && winner) {
      setOpen(true);

      // Confetti
      const colors = winner === 1 
        ? ["#8B5CF6", "#A78BFA"]
        : ["#EC4899", "#F472B6"];

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors
      });
    } else {
      setOpen(false);
    }
  }, [status, winner]);

  const handlePlayAgain = () => {
    newRound();
    setOpen(false);
  };

  const handleNewGame = () => {
    restartGame();
    setOpen(false);
  };

  const flowers = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    left: i < 6 ? `${i * 6}%` : `${(i - 6) * 6 + 70}%`,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1 + 2
  }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-black border border-gray-700 rounded-lg p-6 w-full max-w-md shadow-xl overflow-hidden">
        
        {/* Floating emoji flowers */}
        {flowers.map(flower => (
          <div
            key={flower.id}
            className="absolute animate-float opacity-70"
            style={{
              left: flower.left,
              bottom: "-50px",
              animationDelay: `${flower.delay}s`,
              animationDuration: `${flower.duration}s`,
              fontSize: `${flower.size}px`,
              color: winner === 1 ? "#8B5CF6" : "#EC4899"
            }}
          >
            🌸
          </div>
        ))}

        <div className="relative z-10 text-white text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text mb-4">
            Congratulations!
          </h2>
          <p className="text-lg mb-4">
            <span className={`font-bold text-xl ${winner === 1 ? "text-blue-400" : "text-pink-400"}`}>
              Player {winner}
            </span>{" "}
            has won the game!
          </p>

          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce`}
               style={{ backgroundColor: winner === 1 ? "rgba(139, 92, 246, 0.3)" : "rgba(236, 72, 153, 0.3)" }}>
            {winner === 1 ? state.player1.selectedEmoji || "🏆" : state.player2.selectedEmoji || "🏆"}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={handlePlayAgain}
              className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-blue-500 to-pink-500 hover:opacity-90"
            >
              Play Again
            </button>
            <button
              onClick={handleNewGame}
              className="px-4 py-2 rounded-md border border-gray-400 text-gray-300 hover:bg-gray-700"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerDialog;
