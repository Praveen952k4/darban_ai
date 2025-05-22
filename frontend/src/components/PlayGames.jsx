import React from "react";
import { GameProvider, useGame } from "./GameContext";
import { useNavigate } from "react-router-dom";
import GameStatus from "./GameStatus";
import CategorySelector from "./CategorySelector";
import GameBoard from "./GameBoard";
import BoardThemeSelector from "./BoardThemeSelector";
import EmojiSelector from "./EmojiSelector";
import WinnerDialog from "./WinnerDialog";

const GameContent = () => {
  const { state } = useGame();
  const { status, currentPlayer, pendingMove } = state;
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate("/help");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative">
      <div className="flex justify-end">
        <button
          onClick={handleHelpClick}
          className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300 text-sm sm:px-5 sm:py-3 sm:text-base md:text-lg"
          aria-label="Help"
          type="button"
        >
          Need Help?
        </button>
      </div>

      <WinnerDialog />

      <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-center mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse">
        Blink Tac Toe
      </h1>

      <GameStatus />

      {status === "category-selection" ? (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <CategorySelector player={1} />
            <CategorySelector player={2} />
          </div>
          <BoardThemeSelector />
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <GameBoard />
          </div>

          {pendingMove && (
            <div className="mb-8">
              <EmojiSelector player={currentPlayer} />
            </div>
          )}

          <div className="mt-4">
            <BoardThemeSelector />
          </div>
        </div>
      )}

      <hr className="my-8 border-t border-gray-300" />

      <div className="text-center text-sm text-gray-400">
        <p>Make a line of three of your emojis to win!</p>
        <p>Remember: You can only have 3 emojis on the board at once.</p>
        <p>When you place your 4th emoji, your oldest emoji will vanish.</p>
      </div>
    </div>
  );
};

const PlayGames = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <GameContent />
      </div>
    </GameProvider>
  );
};

export default PlayGames;
