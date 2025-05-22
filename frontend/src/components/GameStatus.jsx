import React from "react";
import { useGame } from "./GameContext";

const GameStatus = () => {
  const { state, newRound, restartGame } = useGame();
  const { status, currentPlayer, winner, player1, player2 } = state;

  const getCurrentPlayerName = () => (currentPlayer === 1 ? "Player 1" : "Player 2");
  const getCurrentPlayerColor = () => (currentPlayer === 1 ? "text-rose-600" : "text-sky-600");
  const getWinnerName = () => (winner === 1 ? "Player 1" : "Player 2");
  const getWinnerColor = () => (winner === 1 ? "text-rose-600" : "text-sky-600");

  if (status === "category-selection") {
    return (
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-neutral-800">Emoji Tic Tac Toe</h2>
        <p className="text-neutral-500 mt-2">Both players, please select your emoji category.</p>
      </div>
    );
  }

  if (status === "emoji-selection") {
    return (
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-neutral-800">Choose Your Emojis</h2>
        <p className="text-neutral-500 mt-2">Each player, select one emoji to play.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 mb-8">
      {/* Player Scores */}
      <div className="flex gap-8">
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-lg shadow border border-neutral-200">
          <span className="text-2xl">{player1.selectedEmoji}</span>
          <span className="text-neutral-700 font-medium">Player 1:</span>
          <span className="text-rose-600 font-bold">{player1.score}</span>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-lg shadow border border-neutral-200">
          <span className="text-2xl">{player2.selectedEmoji}</span>
          <span className="text-neutral-700 font-medium">Player 2:</span>
          <span className="text-sky-600 font-bold">{player2.score}</span>
        </div>
      </div>

      {/* Current Turn */}
      {status === "playing" && (
        <div className="flex items-center gap-4 mt-2">
          <span
            className="text-3xl w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 border border-neutral-300"
          >
            {currentPlayer === 1 ? player1.selectedEmoji : player2.selectedEmoji}
          </span>
          <span className={`text-xl font-semibold ${getCurrentPlayerColor()}`}>
            {getCurrentPlayerName()}'s Turn
          </span>
        </div>
      )}

      {/* Winner */}
      {status === "won" && (
        <div className="text-center mt-4">
          <h2 className={`text-3xl font-bold mb-4 ${getWinnerColor()}`}>
            {getWinnerName()} Wins!
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={newRound}
              className="px-5 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
            >
              🔁 Play Again
            </button>
            <button
              onClick={restartGame}
              className="px-5 py-2 bg-white border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition"
            >
              🔄 New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStatus;
