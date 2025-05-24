
import React, { useEffect } from "react";

import { GameProvider, useGame } from "./GameContext";
import { useNavigate } from "react-router-dom";
import GameStatus from "./GameStatus";
import CategorySelector from "./CategorySelector";
import GameBoard from "./GameBoard";
import BoardThemeSelector from "./BoardThemeSelector";
import EmojiSelector from "./EmojiSelector";
import WinnerDialog from "./WinnerDialog";
import AudioService from "../Music/AudioService"
const GameContent = () => {
  const { state } = useGame();
  const { status, currentPlayer, pendingMove } = state;
   const navigate = useNavigate();
  const handleHelpClick = () => {
    navigate("/help");
  };
  useEffect(() => {
    const audioService = AudioService.getInstance();

    if (status === "won") {
      audioService.playSound("emoji");
      if (audioService.isMusicOn()) {
        audioService.playMusic("victory");
      }
    }
  }, [status]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 relative">
      

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

      <h1 className="text-4xl font-bold text-center mb-6 tracking-wide bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-transparent bg-clip-text animate-pulse">
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
      ) : status === "playing" && (
        <div>
          <div className="mb-8">
            <GameBoard />
            {pendingMove && (
              <div className="flex justify-center mt-4">
              </div>
            )}
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

      <hr className="my-8 border-gray-700" />


      <div className="text-center text-sm text-gray-500">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
        <GameContent />
      </div>
    </GameProvider>
  );
};

export default PlayGames;