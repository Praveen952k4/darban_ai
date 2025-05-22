import React, { useEffect } from "react";
import { useGame } from "./GameContext";

const EmojiSelector = ({ player }) => {
  const { state, selectEmoji } = useGame();
  const playerState = player === 1 ? state.player1 : state.player2;

  useEffect(() => {
    if (!playerState.category || state.currentPlayer !== player) return;

    const emojis = playerState.category.emojis;
    if (!emojis || emojis.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emojis.length);
    const randomEmoji = emojis[randomIndex];

    if (playerState.selectedEmoji !== randomEmoji) {
      selectEmoji(player, randomEmoji);
    }
  }, [playerState.category, playerState.selectedEmoji, state.currentPlayer, player, selectEmoji]);

  return null;
};

export default EmojiSelector;
