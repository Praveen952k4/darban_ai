import React from "react";
import { useGame } from "./GameContext";
import AudioService from "../Music/AudioService";

const GameBoard = () => {
  const { state, initiateMove } = useGame();
  const { board, winningCells, status, selectedTheme, pendingMove } = state;

  const isGameWon = status === "won";

  const isWinningCell = (row, col) => {
    return winningCells?.some(cell => cell.row === row && cell.col === col) || false;
  };

  const isPendingMove = (row, col) => {
    return pendingMove?.row === row && pendingMove?.col === col;
  };

  const handleCellClick = (row, col) => {
    if (status === "playing" && !board[row][col]) {
      AudioService.getInstance().playSound("click");
      initiateMove(row, col);
    }
  };

  return (
    <div
  className={`mx-auto p-3 rounded-xl ${
    selectedTheme.background || ""
  } w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px]`}
>
  <div className="grid grid-cols-3 gap-2 sm:gap-3 h-full w-full">
    {board.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        const isWinner = isGameWon && isWinningCell(rowIndex, colIndex);
        const isPending = isPendingMove(rowIndex, colIndex);
        const isCellEmpty = !cell && status === "playing";

        const baseClasses =
          "aspect-square rounded-xl shadow-md flex items-center justify-center transition-all duration-200 border-2";
        const cursorClass = isCellEmpty ? "cursor-pointer hover:scale-105" : "cursor-not-allowed";
        const winnerClass = isWinner
          ? "bg-green-100/30 animate-winner-pulse"
          : status === "won"
          ? "opacity-75"
          : "";
        const pendingClass = isPending
          ? "ring-2 ring-yellow-300 ring-opacity-70 animate-pulse"
          : "";

        return (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={`${baseClasses} ${selectedTheme.cellBackground} ${selectedTheme.borderColor} ${cursorClass} ${winnerClass} ${pendingClass}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            disabled={status !== "playing" || !!cell}
            aria-label={`Cell ${rowIndex}-${colIndex}`}
          >
            {cell && (
              <span
                className={`text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] leading-none ${
                  cell.player === 1 ? "text-player1" : "text-player2"
                }`}
              >
                {cell.emoji}
              </span>
            )}
          </button>
        );
      })
    )}
  </div>
</div>

  );
};

export default GameBoard;
