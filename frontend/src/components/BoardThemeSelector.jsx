import React from "react";
import { useGame } from "./GameContext";
import { boardThemes } from "../../assets/assets";
import AudioService from "../Music/AudioService";

const audio = AudioService.getInstance();

const BoardThemeSelector = () => {
  const { state, selectBoardTheme } = useGame();
  const { selectedTheme } = state;

  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-medium mb-2 text-center">Board Theme</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {boardThemes.map((theme) => {
          const isActive = selectedTheme.id === theme.id;
          const buttonClasses = `
            h-20 w-full flex flex-col items-center justify-center border-2 rounded-md transition
            ${theme.background} ${theme.borderColor}
            ${isActive ? "ring-2 ring-white ring-offset-2 ring-offset-black" : ""}
          `;
          const previewClasses = `
            w-4 h-4 rounded border mb-2
            ${theme.cellBackground} ${theme.borderColor}
          `;

          return (
            <button
              key={theme.id}
              className={buttonClasses}
              onClick={() => {
                audio.playSound("click");
                selectBoardTheme(theme);
              }}
            >
              <div className={previewClasses}></div>
              <span className="text-xs font-medium text-white">{theme.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BoardThemeSelector;
