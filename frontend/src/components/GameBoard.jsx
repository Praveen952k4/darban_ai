import React from "react";
import { useGame } from "./GameContext"; // Adjust path as needed

const GameBoard = () => {
  const { state, initiateMove } = useGame();
  const { board, winningCells, status, selectedTheme } = state;

  const isWinningCell = (row, col) => {
    if (!winningCells) return false;
    return winningCells.some(cell => cell.row === row && cell.col === col);
  };

  const canClick = status === "playing";

  return (
    <div
      className={`grid grid-cols-3 gap-2 justify-center mx-auto p-4 rounded-md
        ${selectedTheme.background} ${selectedTheme.borderColor} border-4
        max-w-[280px] md:max-w-[480px] lg:max-w-[560px]`}
      // max width grows with screen size: 280px mobile, 480px medium, 560px large screens
      style={{ 
        // Keep aspect ratio for cells and increase font size on larger screens
        fontSize: '2rem',
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isWinnerCell = isWinningCell(rowIndex, colIndex);
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`flex items-center justify-center 
                text-4xl md:text-6xl lg:text-7xl rounded-md 
                cursor-${canClick && !cell ? "pointer" : "default"}
                ${selectedTheme.cellBackground} ${selectedTheme.borderColor} border-2
                ${isWinnerCell ? "bg-yellow-300" : ""}`}
              style={{ userSelect: "none", aspectRatio: "1 / 1" }}
              onClick={() => {
                if (canClick && !cell) {
                  initiateMove(rowIndex, colIndex);
                }
              }}
              role="button"
              tabIndex={canClick && !cell ? 0 : -1}
              onKeyDown={e => {
                if ((e.key === "Enter" || e.key === " ") && canClick && !cell) {
                  initiateMove(rowIndex, colIndex);
                }
              }}
              aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
            >
              {cell ? cell.emoji : ""}
            </div>
          );
        })
      )}
    </div>
  );
};

export default GameBoard;
