import React from "react";
import { useGame } from "./GameContext"; 
import { EmojiCategory } from "../../assets/assets"; 

const CategorySelector = ({ player }) => {
  const { state, selectCategory } = useGame();
  const playerState = player === 1 ? state.player1 : state.player2;
  const otherPlayerCategory = player === 1 ? state.player2.category : state.player1.category;

  const playerColor = player === 1 ? { backgroundColor: "#e0f2fe", borderColor: "#0284c7" } : { backgroundColor: "#ede9fe", borderColor: "#7c3aed" };
  const playerTextColor = player === 1 ? { color: "#0284c7" } : { color: "#7c3aed" };

  return (
    <div style={{ ...playerColor, borderWidth: 2, borderStyle: "solid", borderRadius: 6, padding: 16 }}>
      <div>
        <h2 style={{ marginBottom: 4, ...playerTextColor }}>Player {player}</h2>
        <p style={{ marginBottom: 16, color: "#1e40af" }}>Select your emoji category</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {EmojiCategory.map((category) => {
        const isDisabled = otherPlayerCategory && otherPlayerCategory.name === category.name;
        const isSelected = playerState.category && playerState.category.name === category.name;

        return (
            <button
            key={category.name}
            onClick={() => !isDisabled && selectCategory(player, category)}
            disabled={isDisabled}
            style={{
                height: 96,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                borderRadius: 8,
                border: isSelected ? "2px solid #000" : "1px solid #ccc",
                backgroundColor: isSelected ? category.color : "#fff",
                opacity: isDisabled ? 0.4 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
                transition: "transform 0.2s",
            }}
            onMouseOver={(e) => {
                if (!isDisabled) e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
            }}
            >
            <div style={{ fontSize: 20 }}>{category.emojis.slice(0, 5).join(" ")}</div>
            <div
                style={{
                fontSize: 14,
                fontWeight: "500",
                color: isSelected ? "#fff" : "#000"
                }}
            >
                {category.name}
            </div>
            </button>
        );
        })}

      </div>
    </div>
  );
};

export default CategorySelector;
